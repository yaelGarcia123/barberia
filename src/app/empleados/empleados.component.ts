import { Component, OnInit } from '@angular/core';
import { Empleado } from '../servicesERP/empleado.model';
import { RegistroService } from '../servicesERP/empleado.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
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
    
    this.http.get<Empleado[]>('https://localhost:7260/api/Empleado').subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // Verifica los datos en consola
        this.empleados = data;
        this.empleadosFiltrados = [...this.empleados];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error completo:', err); // Muestra el error completo
        this.error = 'Error al cargar los empleados. Por favor intente más tarde.';
        this.cargando = false;
      },
      complete: () => {
        console.log('Petición completada'); // Para depuración
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
      (emp.Nombre && emp.Nombre.toLowerCase().includes(termino)) ||
      (emp.Apellido && emp.Apellido.toLowerCase().includes(termino)) ||
      (emp.RFC && emp.RFC.toLowerCase().includes(termino)) ||
      (emp.Puesto && emp.Puesto.toLowerCase().includes(termino)) ||
      (emp.Departamento && emp.Departamento.toLowerCase().includes(termino))
    );
  }
}