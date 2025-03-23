import { Component } from '@angular/core';
import { ComprasService } from '../services/compras.service';

@Component({
  selector: 'app-admincompras',
  templateUrl: './admincompras.component.html',
  styleUrl: './admincompras.component.css'
})
export class AdmincomprasComponent {
  compras: any[] = [];

  constructor(private comprasService: ComprasService) { }

  ngOnInit(): void {
    // Obtener todas las compras al cargar el componente
    this.obtenerCompras();
  }

  obtenerCompras(): void {
    this.comprasService.verCompras().subscribe({
      next: (data) => {
        this.compras = data;
      },
      error: (error) => {
        console.error('Error al obtener las compras:', error);
      },
      complete: () => {
        console.log('Operación de obtención de compras completada.');
      }
    });
  }
}
