import { Component, OnInit } from '@angular/core';
import { NominaService } from '../servicesERP/nomina.service';
import { Empleado, Nomina, Percepciones, Deducciones, ReciboNomina } from '../servicesERP/model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-generar-recibo',
  templateUrl: './generar-recibo.component.html',
  styleUrls: ['./generar-recibo.component.css']
})
export class GenerarReciboComponent implements OnInit {
  empleados: Empleado[] = [];
  periodos: string[] = [];
  selectedEmpleado: string = '';
  selectedPeriodo: string = '';
  recibo: ReciboNomina | null = null;
  loading = false;
  error = '';

  constructor(private nominaService: NominaService) { }

  ngOnInit(): void {
    this.loadEmpleados();
    this.loadPeriodos();
  }

  loadEmpleados(): void {
    this.nominaService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (err) => {
        console.error('Error al cargar empleados', err);
      }
    });
  }

  loadPeriodos(): void {
    this.nominaService.getPeriodosNomina().subscribe({
      next: (data) => {
        this.periodos = data;
      },
      error: (err) => {
        console.error('Error al cargar períodos', err);
      }
    });
  }

  cargarRecibo(): void {
    if (!this.selectedEmpleado || !this.selectedPeriodo) {
      this.error = 'Selecciona un empleado y un período';
      return;
    }

    this.loading = true;
    this.error = '';
    this.recibo = null;

    this.nominaService.getReciboNomina(this.selectedEmpleado, this.selectedPeriodo).subscribe({
      next: (data) => {
        this.recibo = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el recibo de nómina';
        this.loading = false;
        console.error(err);
      }
    });
  }

  generarPDF(): void {
    if (!this.recibo) {
      this.error = 'No hay recibo para generar PDF';
      return;
    }

    const doc = new jsPDF();
    const margin = 10;
    let yPos = margin;

    // Logo de la empresa (opcional)
    // doc.addImage(logoData, 'JPEG', margin, yPos, 40, 20);
    yPos += 25;

    // Encabezado
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text('COMPROBANTE DE NÓMINA', 105, yPos, { align: 'center' });
    yPos += 10;

    doc.setFontSize(10);
    doc.text('Nombre de la Empresa', 105, yPos, { align: 'center' });
    yPos += 5;
    doc.text('Dirección de la Empresa', 105, yPos, { align: 'center' });
    yPos += 5;
    doc.text('RFC de la Empresa', 105, yPos, { align: 'center' });
    yPos += 15;

    // Datos del empleado
    doc.setFontSize(12);
    doc.text('DATOS DEL EMPLEADO', margin, yPos);
    yPos += 7;

    doc.setFontSize(10);
    autoTable(doc, {
      startY: yPos,
      head: [['Campo', 'Valor']],
      body: [
        ['RFC', this.recibo.empleado.RFC],
        ['Nombre', `${this.recibo.empleado.Nombre} ${this.recibo.empleado.Apellido}`],
        ['Puesto', this.recibo.empleado.Puesto],
        ['Fecha', new Date(this.recibo.nomina.Fecha).toLocaleDateString()],
        ['Período', this.recibo.nomina.Periodo],
        ['Días pagados', this.recibo.nomina.DiasPagados.toString()],
        ['Tipo de pago', this.recibo.nomina.TipoPago]
      ],
      margin: { left: margin },
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { cellPadding: 3, fontSize: 9 }
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    // Percepciones
    doc.setFontSize(12);
    doc.text('PERCEPCIONES', margin, yPos);
    yPos += 7;

    const percepciones = [
      ['Sueldo Base', this.recibo.percepciones.SueldoBase],
      ['Puntualidad', this.recibo.percepciones.Puntualidad],
      ['Vales de Despensa', this.recibo.percepciones.ValesDespensa],
      ['Compensaciones', this.recibo.percepciones.Compensaciones],
      ['Vacaciones', this.recibo.percepciones.Vacaciones],
      ['Prima Antigüedad', this.recibo.percepciones.PrimaAntiguedad],
      ['Otras Prestaciones', this.recibo.percepciones.OtrasPrestaciones],
      ['TOTAL PERCEPCIONES', this.calcularTotalPercepciones()]
    ];

    autoTable(doc, {
      startY: yPos,
      head: [['Concepto', 'Importe']],
      body: percepciones,
      margin: { left: margin },
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { cellPadding: 3, fontSize: 9 },
      columnStyles: { 
        1: { cellWidth: 40, halign: 'right' } 
      },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.row.index === percepciones.length - 1) {
          doc.setFont( 'bold');
        }
      }
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    // Deducciones
    doc.setFontSize(12);
    doc.text('DEDUCCIONES', margin, yPos);
    yPos += 7;

    const deducciones = [
      ['ISR (ISPT)', this.recibo.deducciones.ISR],
      ['IMSS', this.recibo.deducciones.IMSS],
      ['INFONAVIT', this.recibo.deducciones.INFONAVIT],
      ['Caja de Ahorro', this.recibo.deducciones.CajaAhorro],
      ['Préstamos', this.recibo.deducciones.Prestamos],
      ['FONACOT', this.recibo.deducciones.FONACOT],
      ['Cuota Sindical', this.recibo.deducciones.CuotaSindical],
      ['Otras Deducciones', this.recibo.deducciones.Otras],
      ['TOTAL DEDUCCIONES', this.calcularTotalDeducciones()]
    ];

    autoTable(doc, {
      startY: yPos,
      head: [['Concepto', 'Importe']],
      body: deducciones,
      margin: { left: margin },
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { cellPadding: 3, fontSize: 9 },
      columnStyles: { 
        1: { cellWidth: 40, halign: 'right' } 
      },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.row.index === deducciones.length - 1) {
          doc.setFont('bold');
        }
      }
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    // Resumen
    doc.setFontSize(12);
    doc.text('RESUMEN', margin, yPos);
    yPos += 7;

    autoTable(doc, {
      startY: yPos,
      body: [
        ['Sueldo Bruto', this.recibo.nomina.SueldoBruto],
        ['Sueldo Neto', this.recibo.nomina.SueldoNeto]
      ],
      margin: { left: margin },
      theme: 'grid',
      styles: { cellPadding: 3, fontSize: 9, halign: 'right' },
      columnStyles: { 
        0: { cellWidth: 40, fontStyle: 'bold', halign: 'left' },
        1: { cellWidth: 40, fontStyle: 'bold' }
      }
    });

    // Pie de página
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text('Este documento es una representación impresa del comprobante de nómina.', 105, 280, { align: 'center' });
    doc.text('Generado el: ' + new Date().toLocaleDateString(), 105, 285, { align: 'center' });

    // Guardar el PDF
    doc.save(`Recibo_Nomina_${this.recibo.empleado.RFC}_${this.recibo.nomina.Periodo}.pdf`);
  }

  calcularTotalPercepciones(): number {
    if (!this.recibo?.percepciones) return 0;
    const p = this.recibo.percepciones;
    return p.SueldoBase + p.Puntualidad + p.ValesDespensa + p.Compensaciones + 
           p.Vacaciones + p.PrimaAntiguedad + p.OtrasPrestaciones;
  }

  calcularTotalDeducciones(): number {
    if (!this.recibo?.deducciones) return 0;
    const d = this.recibo.deducciones;
    return d.ISR + d.IMSS + d.INFONAVIT + d.CajaAhorro + 
           d.Prestamos + d.FONACOT + d.CuotaSindical + d.Otras;
  }
}