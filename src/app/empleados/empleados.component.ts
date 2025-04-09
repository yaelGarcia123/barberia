import { Component, OnInit } from '@angular/core';
import {  RegistroService } from '../servicesERP/empleado.service';
import { Empleado } from '../servicesERP/empleado.model';

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

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(data => {
      this.empleados = data.map(emp => ({ ...emp, editando: false }));
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
        this.empleados = this.empleados.filter(e => e.IdEmpleado !== id);
      });
    }
  }
}