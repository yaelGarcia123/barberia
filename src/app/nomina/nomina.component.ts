import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {RegistroService} from '../servicesERP/empleado.service';

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent implements OnInit {
  nominaForm: FormGroup;
  empleados: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private empleadoService: RegistroService
  ) {
    this.nominaForm = this.fb.group({
      RFC: ['', Validators.required],
      Fecha: ['', Validators.required],
      Periodo: ['', Validators.required],
      DiasPagados: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      TipoPago: ['Quincenal', Validators.required],
      SueldoBruto: ['', [Validators.required, Validators.min(0)]],
      TotalPercepciones: ['', [Validators.required, Validators.min(0)]],
      TotalDeducciones: ['', [Validators.required, Validators.min(0)]],
      SueldoNeto: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.cargarEmpleados();
    
    // Calcular sueldo neto cuando cambian percepciones o deducciones
    this.nominaForm.get('TotalPercepciones')?.valueChanges.subscribe(() => this.calcularSueldoNeto());
    this.nominaForm.get('TotalDeducciones')?.valueChanges.subscribe(() => this.calcularSueldoNeto());
    this.nominaForm.get('SueldoBruto')?.valueChanges.subscribe(() => this.calcularSueldoNeto());
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

  calcularSueldoNeto(): void {
    const sueldoBruto = parseFloat(this.nominaForm.get('SueldoBruto')?.value) || 0;
    const percepciones = parseFloat(this.nominaForm.get('TotalPercepciones')?.value) || 0;
    const deducciones = parseFloat(this.nominaForm.get('TotalDeducciones')?.value) || 0;
    
    const sueldoNeto = sueldoBruto + percepciones - deducciones;
    this.nominaForm.get('SueldoNeto')?.setValue(sueldoNeto.toFixed(2));
  }

  onSubmit(): void {
    if (this.nominaForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos requeridos correctamente';
      return;
    }

    this.http.post('URL_DE_TU_API/nominas', this.nominaForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'Nómina registrada correctamente';
        this.nominaForm.reset({
          TipoPago: 'Quincenal',
          DiasPagados: 15
        });
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Error al registrar la nómina';
        console.error(err);
      }
    });
  }
}