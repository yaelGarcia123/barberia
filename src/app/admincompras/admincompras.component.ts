import { Component, Inject  } from '@angular/core';
import { CompraService } from '../services/compras.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Compra } from '../services/compra.model'; // Asegúrate de que la ruta del modelo sea correcta

@Component({
  selector: 'app-admincompras',
  templateUrl: './admincompras.component.html',
  styleUrl: './admincompras.component.css'
})
export class AdmincomprasComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { compra: Compra }) { }

  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pendiente': return 'estado-pendiente';
      case 'completada': return 'estado-completada';
      case 'cancelada': return 'estado-cancelada';
      default: return '';
    }
  }
}
