import { Component, OnInit } from '@angular/core';
import { NominaService, Nomina } from '../servicesERP/nomina.service';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../servicesERP/empleado.model';

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent implements OnInit {
  empleados: Empleado[] = [];
  nominas: Nomina[] = [];
  empleadoSeleccionado: number | null = null;

  constructor(private nominaService: NominaService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarNominas();
  }

  cargarEmpleados() {
    this.http.get<Empleado[]>('https://localhost:7260/api/Empleado').subscribe(data => {
      this.empleados = data;
    });
  }

  cargarNominas() {
    this.nominaService.obtenerNominas().subscribe(data => {
      this.nominas = data;
    });
  }

  generarNomina() {
    if (this.empleadoSeleccionado) {
      this.nominaService.generarNomina(this.empleadoSeleccionado).subscribe(() => {
        alert('Nómina generada con éxito');
        this.cargarNominas(); // Recarga la tabla
      }, error => {
        alert('Error al generar la nómina');
      });
    } else {
      alert('Selecciona un empleado');
    }
  }

  descargarRecibo(nominaId: number) {
    this.nominaService.descargarRecibo(nominaId).subscribe({
      next: (response) => {
        // Crear enlace temporal para descarga
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recibo_nomina_${nominaId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error detallado:', err);
        
        if (err.status === 404) {
          alert('Nómina no encontrada');
        } 
        else if (err.status === 400) {
          alert('Datos incompletos para generar el recibo');
        }
        else {
          alert('Error al generar el PDF. Verifica la consola para más detalles.');
        }
      }
    });
  }
}
