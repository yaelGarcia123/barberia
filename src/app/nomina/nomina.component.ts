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
  cargando = false; // Nueva variable para mostrar spinner si quieres

  constructor(private nominaService: NominaService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarNominas();
  }

  cargarEmpleados() {
    this.http.get<Empleado[]>('https://localhost:7260/api/Empleado').subscribe({
      next: data => this.empleados = data,
      error: error => {
        console.error('Error al cargar empleados:', error);
        alert('Error al cargar empleados');
      }
    });
  }

  cargarNominas() {
    this.nominaService.obtenerNominas().subscribe({
      next: data => this.nominas = data,
      error: error => {
        console.error('Error al cargar nóminas:', error);
        alert('Error al cargar nóminas');
      }
    });
  }

  generarNomina() {
    if (!this.empleadoSeleccionado) {
      alert('Selecciona un empleado');
      return;
    }

    this.cargando = true;

    this.nominaService.generarNomina(this.empleadoSeleccionado).subscribe({
      next: () => {
        alert('Nómina generada con éxito');
        this.cargarNominas(); // Recarga las nóminas después de generar
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        console.error('Error detallado:', error);
        if (error.status === 400) {
          alert(error.error || 'Ya existe una nómina para este periodo o datos inválidos');
        } else {
          alert('Error al generar la nómina');
        }
      }
    });
  }

  descargarRecibo(nominaId: number) {
    this.nominaService.descargarRecibo(nominaId).subscribe({
      next: (response) => {
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
        } else if (err.status === 400) {
          alert('Datos incompletos para generar el recibo');
        } else {
          alert('Error al generar el PDF. Verifica la consola para más detalles.');
        }
      }
    });
  }
}
