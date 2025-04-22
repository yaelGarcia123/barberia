import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { NominaService, Nomina } from '../servicesERP/nomina.service';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../servicesERP/empleado.model';
=======
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NominaService } from '../servicesERP/nomina.service'; // Asegúrate de crear este servicio
>>>>>>> b45b4e7b060691419bce0d2806643efd5a21c813

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent implements OnInit {
<<<<<<< HEAD
  empleados: Empleado[] = [];
  nominas: Nomina[] = [];
  empleadoSeleccionado: number | null = null;

  constructor(private nominaService: NominaService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarNominas();
  }

  cargarEmpleados() {
    this.http.get<Empleado[]>('https://localhost:7260/api/Empleado').subscribe(data => {
      this.empleados = data;
    });
  }

  cargarNominas() {
    this.nominaService.obtenerNominas().subscribe(data => {
      this.nominas = data;
    });
  }

  generarNomina() {
    if (this.empleadoSeleccionado) {
      this.nominaService.generarNomina(this.empleadoSeleccionado).subscribe(() => {
        alert('Nómina generada con éxito');
        this.cargarNominas(); // Recarga la tabla
      }, error => {
        alert('Error al generar la nómina');
      });
    } else {
      alert('Selecciona un empleado');
    }
  }

  descargarRecibo(nominaId: number) {
    this.nominaService.descargarRecibo(nominaId).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, error => {
      alert('Error al descargar el recibo de nómina');
    });
=======
  nominaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private nominaService: NominaService
  ) {
    this.nominaForm = this.fb.group({
      // Datos básicos de nómina
      RFC: ['', [Validators.required, Validators.maxLength(20)]],
      Fecha: ['', Validators.required],
      Periodo: ['', Validators.required],
      DiasPagados: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      TipoPago: ['', Validators.required],
      SueldoBruto: ['', [Validators.required, Validators.min(0)]],
      TotalPercepciones: ['', [Validators.required, Validators.min(0)]],
      TotalDeducciones: ['', [Validators.required, Validators.min(0)]],
      SueldoNeto: ['', [Validators.required, Validators.min(0)]],

      // Percepciones
      percepciones: this.fb.group({
        SueldoBase: ['', [Validators.required, Validators.min(0)]],
        Puntualidad: ['0', [Validators.min(0)]],
        ValesDespensa: ['0', [Validators.min(0)]],
        Compensaciones: ['0', [Validators.min(0)]],
        Vacaciones: ['0', [Validators.min(0)]],
        PrimaAntiguedad: ['0', [Validators.min(0)]],
        OtrasPrestaciones: ['0', [Validators.min(0)]]
      }),

      // Deducciones
      deducciones: this.fb.group({
        ISR: ['', [Validators.required, Validators.min(0)]],
        IMSS: ['', [Validators.required, Validators.min(0)]],
        INFONAVIT: ['0', [Validators.min(0)]],
        CajaAhorro: ['0', [Validators.min(0)]],
        Prestamos: ['0', [Validators.min(0)]],
        FONACOT: ['0', [Validators.min(0)]],
        CuotaSindical: ['0', [Validators.min(0)]],
        Otras: ['0', [Validators.min(0)]]
      })
    });
  }

  ngOnInit(): void {
    // Escuchar cambios para calcular totales
    this.nominaForm.get('percepciones')?.valueChanges.subscribe(() => this.calcularTotales());
    this.nominaForm.get('deducciones')?.valueChanges.subscribe(() => this.calcularTotales());
  }

  calcularTotales() {
    const percepciones = this.nominaForm.get('percepciones')?.value;
    const deducciones = this.nominaForm.get('deducciones')?.value;

    // Calcular total percepciones
    const totalPercepciones = Object.values(percepciones).reduce((sum: number, val: any) => sum + parseFloat(val || 0), 0);
    
    // Calcular total deducciones
    const totalDeducciones = Object.values(deducciones).reduce((sum: number, val: any) => sum + parseFloat(val || 0), 0);
    
    // Calcular sueldo neto
    const sueldoBruto = parseFloat(this.nominaForm.get('SueldoBruto')?.value || 0);
    const sueldoNeto = sueldoBruto + totalPercepciones - totalDeducciones;

    // Actualizar valores en el formulario
    this.nominaForm.patchValue({
      TotalPercepciones: totalPercepciones.toFixed(2),
      TotalDeducciones: totalDeducciones.toFixed(2),
      SueldoNeto: sueldoNeto.toFixed(2)
    }, { emitEvent: false });
  }

  onSubmit() {
    if (this.nominaForm.valid) {
      const nominaData = {
        ...this.nominaForm.value,
        percepciones: this.nominaForm.get('percepciones')?.value,
        deducciones: this.nominaForm.get('deducciones')?.value
      };

      this.nominaService.registrarNomina(nominaData).subscribe(
        response => {
          alert('Nómina registrada exitosamente');
          this.nominaForm.reset();
        },
        error => {
          console.error('Error al registrar nómina:', error);
          alert('Ocurrió un error al registrar la nómina');
        }
      );
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
>>>>>>> b45b4e7b060691419bce0d2806643efd5a21c813
  }
}
