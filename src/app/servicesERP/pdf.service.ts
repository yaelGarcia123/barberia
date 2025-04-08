import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generarReciboNomina(
    datosEmpleado: any,
    datosNomina: any,
    percepciones: any,
    deducciones: any
  ): void {
    const doc = new jsPDF('p', 'pt', 'letter');
    
    // Configuración inicial
    doc.setFont('helvetica');
    doc.setFontSize(10);

    // Logo de la empresa (opcional)
    // doc.addImage(logoData, 'JPEG', 40, 20, 100, 40);

    // Encabezado
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text('RECIBO DE NÓMINA', doc.internal.pageSize.width / 2, 50, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.width - 40, 50, { align: 'right' });

    // Datos de la empresa
    doc.setFontSize(10);
    doc.text('EMPRESA XYZ, S.A. DE C.V.', 40, 80);
    doc.text('RFC: XXXX010101XXX', 40, 95);
    doc.text('Dirección: Av. Principal #123, Col. Centro', 40, 110);
    doc.text('Teléfono: 55 1234 5678', 40, 125);

    // Datos del empleado
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 128);
    doc.text('DATOS DEL EMPLEADO', 40, 160);

    doc.setFontSize(10);
    doc.setTextColor(0);
    const empleadoData = [
      [`RFC: ${datosEmpleado.RFC}`, `Nombre: ${datosEmpleado.Nombre} ${datosEmpleado.Apellido}`],
      [`Puesto: ${datosEmpleado.Puesto}`, `Departamento: ${datosEmpleado.Departamento}`],
      [`Fecha de ingreso: ${new Date(datosEmpleado.FechaIngreso).toLocaleDateString()}`, `Tipo contrato: ${datosEmpleado.TipoContrato}`]
    ];

    (doc as any).autoTable({
      startY: 170,
      head: [],
      body: empleadoData,
      theme: 'grid',
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
      styles: { cellPadding: 5, fontSize: 10 },
      margin: { left: 40 },
      tableWidth: 'auto'
    });

    // Datos de la nómina
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 128);
    doc.text('DATOS DE LA NÓMINA', 40, 240);

    doc.setFontSize(10);
    doc.setTextColor(0);
    const nominaData = [
      [`Periodo: ${datosNomina.Periodo}`, `Días pagados: ${datosNomina.DiasPagados}`],
      [`Tipo de pago: ${datosNomina.TipoPago}`, `Fecha: ${new Date(datosNomina.Fecha).toLocaleDateString()}`],
      [`Salario diario: ${this.formatoMoneda(datosNomina.SueldoBruto / datosNomina.DiasPagados)}`, `Salario bruto: ${this.formatoMoneda(datosNomina.SueldoBruto)}`]
    ];

    (doc as any).autoTable({
      startY: 250,
      head: [],
      body: nominaData,
      theme: 'grid',
      styles: { cellPadding: 5, fontSize: 10 },
      margin: { left: 40 },
      tableWidth: 'auto'
    });

    // Percepciones
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 128);
    doc.text('PERCEPCIONES', 40, 320);

    const percepcionesData = [
      ['Concepto', 'Importe'],
      ['Sueldo base', this.formatoMoneda(percepciones.SueldoBase)],
      ['Puntualidad', this.formatoMoneda(percepciones.Puntualidad)],
      ['Vales de despensa', this.formatoMoneda(percepciones.ValesDespensa)],
      ['Compensaciones', this.formatoMoneda(percepciones.Compensaciones)],
      ['Vacaciones', this.formatoMoneda(percepciones.Vacaciones)],
      ['Prima antigüedad', this.formatoMoneda(percepciones.PrimaAntiguedad)],
      ['Otras prestaciones', this.formatoMoneda(percepciones.OtrasPrestaciones)],
      ['TOTAL PERCEPCIONES', this.formatoMoneda(datosNomina.TotalPercepciones)]
    ];

    (doc as any).autoTable({
      startY: 330,
      head: [percepcionesData[0]],
      body: percepcionesData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
      styles: { cellPadding: 5, fontSize: 10 },
      margin: { left: 40 },
      tableWidth: 'auto',
      didDrawCell: (data: any) => {
        if (data.row.index === percepcionesData.length - 2) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [220, 220, 220];
        }
      }
    });

    // Deducciones
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 128);
    doc.text('DEDUCCIONES', 40, (doc as any).lastAutoTable.finalY + 20);

    const deduccionesData = [
      ['Concepto', 'Importe'],
      ['ISR (ISPT)', this.formatoMoneda(deducciones.ISR)],
      ['IMSS', this.formatoMoneda(deducciones.IMSS)],
      ['INFONAVIT', this.formatoMoneda(deducciones.INFONAVIT)],
      ['Caja de ahorro', this.formatoMoneda(deducciones.CajaAhorro)],
      ['Préstamos', this.formatoMoneda(deducciones.Prestamos)],
      ['FONACOT', this.formatoMoneda(deducciones.FONACOT)],
      ['Cuota sindical', this.formatoMoneda(deducciones.CuotaSindical)],
      ['Otras deducciones', this.formatoMoneda(deducciones.Otras)],
      ['TOTAL DEDUCCIONES', this.formatoMoneda(datosNomina.TotalDeducciones)]
    ];

    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 30,
      head: [deduccionesData[0]],
      body: deduccionesData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
      styles: { cellPadding: 5, fontSize: 10 },
      margin: { left: 40 },
      tableWidth: 'auto',
      didDrawCell: (data: any) => {
        if (data.row.index === deduccionesData.length - 2) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [220, 220, 220];
        }
      }
    });

    // Totales
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 128);
    doc.text('LIQUIDO A RECIBIR', doc.internal.pageSize.width - 150, (doc as any).lastAutoTable.finalY + 30);

    doc.setFontSize(14);
    doc.setTextColor(0, 100, 0);
    doc.text(this.formatoMoneda(datosNomina.SueldoNeto), doc.internal.pageSize.width - 150, (doc as any).lastAutoTable.finalY + 50);

    // Sello y firma
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('_________________________________________', 100, doc.internal.pageSize.height - 80);
    doc.text('Firma del empleado', 160, doc.internal.pageSize.height - 60);

    doc.text('_________________________________________', doc.internal.pageSize.width - 200, doc.internal.pageSize.height - 80);
    doc.text('Sello y firma del patrón', doc.internal.pageSize.width - 190, doc.internal.pageSize.height - 60);

    // Pie de página
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('Este documento es una representación impresa del recibo de nómina electrónico.', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 30, { align: 'center' });

    // Guardar el PDF
    doc.save(`Recibo_Nomina_${datosEmpleado.RFC}_${datosNomina.Periodo.replace(/ /g, '_')}.pdf`);
  }

  private formatoMoneda(monto: number): string {
    return new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(monto);
  }
}