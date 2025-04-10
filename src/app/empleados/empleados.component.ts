import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../servicesERP/empleado.service';
import { Empleado } from '../servicesERP/empleado.model';

type EmpleadoParaEdicion = Empleado & {
  editando?: boolean;
  empleadoOriginal?: Empleado | null;
};

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: EmpleadoParaEdicion[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private empleadoService: RegistroService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // ← Añade esto

        this.empleados = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los empleados';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  iniciarEdicion(empleado: EmpleadoParaEdicion): void {
    empleado.empleadoOriginal = { ...empleado };
    empleado.editando = true;
  }

  cancelarEdicion(empleado: EmpleadoParaEdicion): void {
    if (empleado.empleadoOriginal) {
      Object.assign(empleado, empleado.empleadoOriginal);
    }
    empleado.editando = false;
    empleado.empleadoOriginal = null;
  }

  guardarCambios(empleado: EmpleadoParaEdicion): void {
    if (!empleado.IdEmpleado) return;

    this.empleadoService.actualizarEmpleado(empleado).subscribe({
      next: (empleadoActualizado) => {
        const index = this.empleados.findIndex(e => e.IdEmpleado === empleado.IdEmpleado);
        if (index !== -1) {
          this.empleados[index] = {
            ...empleadoActualizado,
            editando: false,
            empleadoOriginal: null
          };
        }
      },
      error: (err) => {
        console.error('Error al actualizar empleado:', err);
        alert('Error al actualizar el empleado');
        this.cancelarEdicion(empleado);
      }
    });
  }

  eliminarEmpleado(id: number): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(id).subscribe({
        next: () => {
          this.empleados = this.empleados.filter(e => e.IdEmpleado !== id);
        },
        error: (err) => {
          console.error('Error al eliminar empleado:', err);
          alert('Error al eliminar el empleado');
        }
      });
    }
  }
}