import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../servicesERP/empleado.service';
import { Empleado } from '../servicesERP/empleado.model';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  editando: number | null = null;
  copia: Empleado | null = null;

  constructor(private empleadoService: RegistroService) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(): void {
    this.empleadoService.obtenerEmpleados().subscribe((data) => {
      this.empleados = data;
    });
  }



  guardarCambios(): void {
    if (this.copia) {
      this.empleadoService.actualizarEmpleado(this.copia).subscribe(() => {
        this.editando = null;
        this.copia = null;
        this.obtenerEmpleados();
      });
    }
  }

  cancelar(): void {
    this.editando = null;
    this.copia = null;

  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(id).subscribe(() => {

        this.obtenerEmpleados();
      });
    }
  }
}



