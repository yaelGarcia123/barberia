import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {RegistroService} from '../servicesERP/empleado.service';

@Component({
  selector: 'app-incapacidad',
  templateUrl: './incapacidad.component.html',
  styleUrls: ['./incapacidad.component.css']
})
export class IncapacidadComponent implements OnInit {
  incapacidadForm: FormGroup;
  empleados: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private empleadoService: RegistroService
  ) {
    this.incapacidadForm = this.fb.group({
      FolioIncapacidad: ['', [Validators.required, Validators.maxLength(20)]],
      RFC: ['', Validators.required],
      FechaInicial: ['', Validators.required],
      FechaFinal: ['', Validators.required],
      Motivo: ['', [Validators.required, Validators.maxLength(255)]],
      Estatus: ['Activa', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar la lista de empleados';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.incapacidadForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos requeridos';
      return;
    }

    const formData = this.incapacidadForm.value;
    
    // Validar que la fecha final sea mayor o igual a la inicial
    if (new Date(formData.FechaFinal) < new Date(formData.FechaInicial)) {
      this.errorMessage = 'La fecha final debe ser mayor o igual a la fecha inicial';
      return;
    }

    this.http.post('URL_DE_TU_API/incapacidades', formData).subscribe({
      next: (response) => {
        this.successMessage = 'Incapacidad registrada correctamente';
        this.incapacidadForm.reset({
          Estatus: 'Activa'
        });
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Error al registrar la incapacidad';
        console.error(err);
      }
    });
  }

  calcularDias(): number {
    const fechaInicial = new Date(this.incapacidadForm.get('FechaInicial')?.value);
    const fechaFinal = new Date(this.incapacidadForm.get('FechaFinal')?.value);
    
    if (!fechaInicial || !fechaFinal) return 0;
    
    const diffTime = Math.abs(fechaFinal.getTime() - fechaInicial.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir ambos días
  }
}