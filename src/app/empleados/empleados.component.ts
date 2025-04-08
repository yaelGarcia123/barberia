import { Component, OnInit } from '@angular/core';
import { Empleado } from '../servicesERP/empleado.model';
import { RegistroService } from '../servicesERP/empleado.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosFiltrados: Empleado[] = [];
  filtro: string = '';
  cargando: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(): void {
    this.cargando = true;
    this.error = null;
    
    this.http.get<Empleado[]>('URL_DE_TU_API/empleados').subscribe({
      next: (data) => {
        this.empleados = data;
        this.empleadosFiltrados = [...this.empleados];
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los empleados. Por favor intente más tarde.';
        this.cargando = false;
        console.error('Error al obtener empleados:', err);
      }
    });
  }

  aplicarFiltro(): void {
    if (!this.filtro) {
      this.empleadosFiltrados = [...this.empleados];
      return;
    }

    const termino = this.filtro.toLowerCase();
    this.empleadosFiltrados = this.empleados.filter(emp =>
      emp.Nombre.toLowerCase().includes(termino) ||
      emp.Apellido.toLowerCase().includes(termino) ||
      emp.RFC.toLowerCase().includes(termino) ||
      emp.Puesto.toLowerCase().includes(termino) ||
      emp.Departamento.toLowerCase().includes(termino)
    );
  }

  formatearFecha(fecha: Date | string): string {
    if (!fecha) return '';
    
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleDateString('es-MX');
  }

  formatearSalario(salario: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(salario);
  }
}
