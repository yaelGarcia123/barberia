import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NominaService } from '../servicesERP/nomina.service';

@Component({
  selector: 'app-percepciones-deducciones',
  templateUrl: './percepciones-deducciones.component.html',
  styleUrls: ['./percepciones-deducciones.component.css']
})
export class PercepcionesDeduccionesComponent implements OnInit {
  percepcionesForm: FormGroup;
  deduccionesForm: FormGroup;
  nominas: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private nominaService: NominaService
  ) {
    // Formulario de Percepciones
    this.percepcionesForm = this.fb.group({
      IdNomina: ['', Validators.required],
      SueldoBase: ['', [Validators.required, Validators.min(0)]],
      Puntualidad: ['0', [Validators.required, Validators.min(0)]],
      ValesDespensa: ['0', [Validators.required, Validators.min(0)]],
      Compensaciones: ['0', [Validators.required, Validators.min(0)]],
      Vacaciones: ['0', [Validators.required, Validators.min(0)]],
      PrimaAntiguedad: ['0', [Validators.required, Validators.min(0)]],
      OtrasPrestaciones: ['0', [Validators.required, Validators.min(0)]]
    });

    // Formulario de Deducciones
    this.deduccionesForm = this.fb.group({
      IdNomina: ['', Validators.required],
      ISR: ['', [Validators.required, Validators.min(0)]],
      IMSS: ['', [Validators.required, Validators.min(0)]],
      INFONAVIT: ['', [Validators.required, Validators.min(0)]],
      CajaAhorro: ['0', [Validators.required, Validators.min(0)]],
      Prestamos: ['0', [Validators.required, Validators.min(0)]],
      FONACOT: ['0', [Validators.required, Validators.min(0)]],
      CuotaSindical: ['0', [Validators.required, Validators.min(0)]],
      Otras: ['0', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.cargarNominas();
  }

  cargarNominas(): void {
    this.nominaService.obtenerNominas().subscribe({
      next: (data) => {
        this.nominas = data;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar la lista de nóminas';
        console.error(err);
      }
    });
  }

  onSubmitPercepciones(): void {
    if (this.percepcionesForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos requeridos en percepciones';
      return;
    }

    this.http.post('URL_DE_TU_API/percepciones', this.percepcionesForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'Percepciones registradas correctamente';
        this.percepcionesForm.reset();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Error al registrar las percepciones';
        console.error(err);
      }
    });
  }

  onSubmitDeducciones(): void {
    if (this.deduccionesForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos requeridos en deducciones';
      return;
    }

    this.http.post('URL_DE_TU_API/deducciones', this.deduccionesForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'Deducciones registradas correctamente';
        this.deduccionesForm.reset();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Error al registrar las deducciones';
        console.error(err);
      }
    });
  }

  calcularTotalPercepciones(): number {
    const values = this.percepcionesForm.value;
    return (parseFloat(values.SueldoBase) || 0) +
           (parseFloat(values.Puntualidad) || 0) +
           (parseFloat(values.ValesDespensa) || 0) +
           (parseFloat(values.Compensaciones) || 0) +
           (parseFloat(values.Vacaciones) || 0) +
           (parseFloat(values.PrimaAntiguedad) || 0) +
           (parseFloat(values.OtrasPrestaciones) || 0);
  }

  calcularTotalDeducciones(): number {
    const values = this.deduccionesForm.value;
    return (parseFloat(values.ISR) || 0) +
           (parseFloat(values.IMSS) || 0) +
           (parseFloat(values.INFONAVIT) || 0) +
           (parseFloat(values.CajaAhorro) || 0) +
           (parseFloat(values.Prestamos) || 0) +
           (parseFloat(values.FONACOT) || 0) +
           (parseFloat(values.CuotaSindical) || 0) +
           (parseFloat(values.Otras) || 0);
  }
}