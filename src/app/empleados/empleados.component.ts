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
   
  }


}