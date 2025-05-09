import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../servicesERP/empleado.service';
import { Empleado } from '../servicesERP/empleado.model';

@Component({
  selector: 'app-registroempleado',
  templateUrl: './registroempleado.component.html',
  styleUrl: './registroempleado.component.css'
})
export class RegistroempleadoComponent implements OnInit {
  @Input() empleado?: Empleado;
  @Output() guardado = new EventEmitter<boolean>();
  
  empleadoForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService
  ) {
    this.empleadoForm = this.fb.group({
      RFC: ['', [Validators.required, Validators.maxLength(20)]],
      TipoContrato: [''],
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Puesto: ['', Validators.required],
      ModoPago: [''],
      Correo: ['', Validators.email],
      Departamento: [''],
      Direccion: [''],
      Telefono: [''],
      FechaIngreso: ['', Validators.required],
      Salario: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.empleado) {
      this.isEditing = true;
      this.empleadoForm.patchValue({
        ...this.empleado,
        FechaIngreso: this.formatDate(this.empleado.fechaIngreso)
      });
    }
  }

  private formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      return date.split('T')[0];
    }
    return date.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      const empleadoData: Empleado = this.empleadoForm.value;
      
      if (this.isEditing && this.empleado?.idEmpleado) {
        this.registroService.actualizarEmpleado(this.empleado).subscribe({
          next: () => {
            this.successMessage = 'Empleado actualizado exitosamente';
            this.errorMessage = '';
            this.guardado.emit(true);
            setTimeout(() => this.successMessage = '', 3000);
          },
          error: (error) => {
            console.error('Error al actualizar empleado:', error);
            this.errorMessage = 'Ocurrió un error al actualizar el empleado';
            this.successMessage = '';
            setTimeout(() => this.errorMessage = '', 3000);
          }
        });
      } else {
        this.registroService.registrarEmpleado(empleadoData).subscribe({
          next: () => {
            this.successMessage = 'Empleado registrado exitosamente';
            this.errorMessage = '';
            this.guardado.emit(true);
            this.resetForm();
            setTimeout(() => this.successMessage = '', 3000);
          },
          error: (error) => {
            console.error('Error al registrar empleado:', error);
            
            if (error.error?.errors) {
              // Mostrar todos los errores uno por uno
              for (const campo in error.error.errors) {
                if (error.error.errors.hasOwnProperty(campo)) {
                  console.error(`${campo}: ${error.error.errors[campo].join(', ')}`);
                }
              }
            } else {
              console.error('Respuesta desconocida del backend:', error.error);
            }
          
            this.errorMessage = 'Error al registrar empleado. Revisa la consola.';
          }
          
        });
      }
    } else {
      this.empleadoForm.markAllAsTouched();
      this.errorMessage = 'Por favor complete todos los campos requeridos correctamente';
      setTimeout(() => this.errorMessage = '', 3000);
    }
  }

  resetForm(): void {
    this.empleadoForm.reset();
    this.empleadoForm.markAsUntouched();
    this.errorMessage = '';
    this.successMessage = '';
    this.isEditing = false;
    this.empleado = undefined;
  }
}