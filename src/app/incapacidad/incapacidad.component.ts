import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncapacidadService } from '../servicesERP/incapacidad.service';
import { RegistroService } from '../servicesERP/empleado.service';




@Component({
  selector: 'app-incapacidad',
  templateUrl: './incapacidad.component.html',
  styleUrls: ['./incapacidad.component.css']
})
export class IncapacidadComponent implements OnInit {
  incapacidadForm: FormGroup;
  mensaje = '';
  empleados: any[] = [];
  incapacidades: any[] = [];
  mostrarFormulario = false;

  constructor(
    private fb: FormBuilder,
    private incapacidadService: IncapacidadService,
    private empleadoService: RegistroService
  ) {
    this.incapacidadForm = this.fb.group({
      folioIncapacidad: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
      rfc: ['', [Validators.required]],
      fechaInicial: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
      motivo: ['', [Validators.required, Validators.minLength(10)]],
      estatus: ['Activa', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarIncapacidades();
  }

 cargarEmpleados (): void {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => this.empleados = data,
      error: (e) => console.error('Error al cargar empleados', e)
    });
  }

  cargarIncapacidades(): void {
    this.incapacidadService.obtenerIncapacidades().subscribe({
      next: (data) => {
        this.incapacidades = data.map(inc => ({
          ...inc,
          fechaInicial: inc.fechaInicial.split('T')[0],
          fechaFinal: inc.fechaFinal.split('T')[0]
        }));
      },
      error: (e) => console.error('Error al cargar incapacidades', e)
    });
  }

  registrar(): void {
    if (this.incapacidadForm.invalid) {
      this.mensaje = 'Por favor completa todos los campos requeridos correctamente';
      this.marcarCamposComoTocados();
      return;
    }

    const formData = this.incapacidadForm.value;
    
    this.incapacidadService.registrarIncapacidad(formData).subscribe({
      next: () => {
        this.mensaje = 'Incapacidad registrada exitosamente!';
        this.incapacidadForm.reset({
          estatus: 'Activa'
        });
        this.cargarIncapacidades();
      },
      error: (e) => {
        console.error('Error completo:', e);
        if (e.error && typeof e.error === 'object') {
          this.mensaje = 'Errores: ' + Object.values(e.error).join(', ');
        } else {
          this.mensaje = 'Error al registrar incapacidad: ' + 
            (e.error?.message || e.message || 'Error desconocido');
        }
      }
    });
  }

  private marcarCamposComoTocados(): void {
    Object.values(this.incapacidadForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  eliminarIncapacidad(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta incapacidad?')) {
      this.incapacidadService.eliminarIncapacidad(id).subscribe({
        next: () => {
          this.mensaje = 'Incapacidad eliminada correctamente';
          this.cargarIncapacidades();
        },
        error: (e) => {
          console.error(e);
          this.mensaje = 'Error al eliminar incapacidad';
        }
      });
    }
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (this.mostrarFormulario) {
      this.mensaje = '';
    }
  }




}