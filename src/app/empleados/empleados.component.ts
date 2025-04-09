import { Component, OnInit } from '@angular/core';
import { Empleado, RegistroService } from '../servicesERP/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];

  constructor(private empleadoService: RegistroService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

<<<<<<< HEAD
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
=======
  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(data => {
      this.empleados = data.map(emp => ({ ...emp, editando: false }));
>>>>>>> 8606a353c755d6522db816e638d036ee1cc186ec
    });
  }

  editar(emp: any): void {
    emp.editando = true;
  }

  guardar(emp: any): void {
    emp.editando = false;
    this.empleadoService.actualizarEmpleado(emp).subscribe(() => {
      console.log('Empleado actualizado');
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(id).subscribe(() => {
        this.empleados = this.empleados.filter(e => e.idEmpleado !== id);
      });
    }
<<<<<<< HEAD

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
=======
  }
}
>>>>>>> 8606a353c755d6522db816e638d036ee1cc186ec
