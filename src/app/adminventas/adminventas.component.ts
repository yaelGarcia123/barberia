import { Component, OnInit } from '@angular/core';
import { VentaService } from '../services/venta.service';

@Component({
  selector: 'app-adminventas',
  templateUrl: './adminventas.component.html',
  styleUrl: './adminventas.component.css'
})
export class AdminventasComponent {
  ventas: any[] = [];

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.ventaService.obtenerVentas().subscribe(data => {
      this.ventas = data;
    });
  }
  
}
