// recibo-nomina.component.ts
import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-recibo-nomina',
  templateUrl: './recibo-nomina.component.html',
  styleUrls: ['./recibo-nomina.component.css']
})
export class ReciboNominaComponent {
  // Datos estáticos del empleado
  empleado = {
    rfc: 'XAXX010101000',
    nombre: 'Juan',
    apellidos: 'Pérez López',
    fecha: new Date().toLocaleDateString(),
    periodo: 'Quincenal 1-15 Abr 2025',
    puesto: 'Desarrollador Senior',
    diasPagados: 15,
    tipoPago: 'Transferencia bancaria'
  };

  // Percepciones estáticas
  percepciones = {
    sueldoBase: 25000.00,
    puntualidad: 500.00,
    valesDespensa: 1200.00,
    compensaciones: 800.00,
    vacaciones: 0.00,
    primaAntiguedad: 750.00,
    otrasPrestaciones: 0.00
  };

  // Deducciones estáticas
  deducciones = {
    isr: 3200.00,
    imss: 1200.00,
    infonavit: 800.00,
    cajaAhorro: 500.00,
    prestamos: 0.00,
    fonacot: 0.00,
    cuotaSindical: 150.00
  };

  // Calculamos totales
  get totalPercepciones(): number {
    return Object.values(this.percepciones).reduce((a, b) => a + b, 0);
  }

  get totalDeducciones(): number {
    return Object.values(this.deducciones).reduce((a, b) => a + b, 0);
  }

  get sueldoNeto(): number {
    return this.totalPercepciones - this.totalDeducciones;
  }

  // Función para exportar a PDF
  exportToPDF() {
    const doc = new jsPDF();
    
    // Encabezado
    doc.setFontSize(18);
    doc.text('RECIBO DE NÓMINA', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Fecha: ${this.empleado.fecha}`, 15, 25);
    doc.text(`Periodo: ${this.empleado.periodo}`, 105, 25, { align: 'center' });
    doc.text(`RFC: ${this.empleado.rfc}`, 180, 25, { align: 'right' });

    // Datos del empleado
    doc.setFontSize(14);
    doc.text('DATOS DEL EMPLEADO', 15, 35);
    doc.setFontSize(12);
    doc.text(`Nombre: ${this.empleado.nombre} ${this.empleado.apellidos}`, 15, 45);
    doc.text(`Puesto: ${this.empleado.puesto}`, 15, 55);
    doc.text(`Días pagados: ${this.empleado.diasPagados}`, 15, 65);
    doc.text(`Tipo de pago: ${this.empleado.tipoPago}`, 15, 75);

    // Percepciones
    doc.setFontSize(14);
    doc.text('PERCEPCIONES', 15, 90);
    doc.setFontSize(12);
    let y = 100;
    Object.entries(this.percepciones).forEach(([key, value]) => {
      const label = this.formatLabel(key);
      doc.text(`${label}: $${value.toFixed(2)}`, 20, y);
      y += 10;
    });
    doc.text(`Total percepciones: $${this.totalPercepciones.toFixed(2)}`, 20, y);

    // Deducciones
    doc.setFontSize(14);
    doc.text('DEDUCCIONES', 15, y + 15);
    doc.setFontSize(12);
    y += 25;
    Object.entries(this.deducciones).forEach(([key, value]) => {
      const label = this.formatLabel(key);
      doc.text(`${label}: $${value.toFixed(2)}`, 20, y);
      y += 10;
    });
    doc.text(`Total deducciones: $${this.totalDeducciones.toFixed(2)}`, 20, y);

    // Total neto
    doc.setFontSize(16);
    doc.text(`SUELDO NETO: $${this.sueldoNeto.toFixed(2)}`, 105, y + 20, { align: 'center' });

    // Pie de página
    doc.setFontSize(10);
    doc.text('Firma del empleado: ________________________', 30, y + 40);
    doc.text('Firma del patrón: ________________________', 130, y + 40);

    // Guardar el PDF
    doc.save(`Recibo_Nomina_${this.empleado.rfc}_${this.empleado.periodo.replace(/ /g, '_')}.pdf`);
  }

  // Función para formatear las claves a labels legibles
  private formatLabel(key: string): string {
    const labels: {[key: string]: string} = {
      sueldoBase: 'Sueldo base',
      puntualidad: 'Puntualidad',
      valesDespensa: 'Vales de despensa',
      compensaciones: 'Compensaciones',
      vacaciones: 'Vacaciones',
      primaAntiguedad: 'Prima antigüedad',
      otrasPrestaciones: 'Otras prestaciones',
      isr: 'ISR (ISPT)',
      imss: 'IMSS',
      infonavit: 'INFONAVIT',
      cajaAhorro: 'Caja de ahorro',
      prestamos: 'Préstamos',
      fonacot: 'FONACOT',
      cuotaSindical: 'Cuota sindical'
    };
    return labels[key] || key;
  }


  getPercepciones() {
    return Object.entries(this.percepciones).map(([key, value]) => ({
      label: this.formatLabel(key),
      value: value
    }));
  }
  
  getDeducciones() {
    return Object.entries(this.deducciones).map(([key, value]) => ({
      label: this.formatLabel(key),
      value: value
    }));
  }
}