import { Component } from '@angular/core';

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.component.html',
  styleUrls: ['./logistica.component.css']
})
export class LogisticaComponent {
  repartidores: string[] = ['Juan', 'María', 'Pedro', 'Ana'];

  orders = [
    { id: 1, cliente: 'Carlos López', direccion: 'Calle 123', estado: 'Pendiente', repartidor: '' },
    { id: 2, cliente: 'Ana Méndez', direccion: 'Avenida 456', estado: 'Pendiente', repartidor: '' },
    { id: 3, cliente: 'Luis Torres', direccion: 'Boulevard 789', estado: 'Pendiente', repartidor: '' }
  ];

  assignRepartidor(orderId: number | undefined, event: Event) {
    if (!orderId) return;

    const selectElement = event.target as HTMLSelectElement | null;
    if (!selectElement) return;

    const repartidor = selectElement.value;
    const order = this.orders.find(o => o.id === orderId);

    if (order) {
      order.repartidor = repartidor;
      order.estado = repartidor ? 'En tránsito' : 'Pendiente';  // Actualiza el estado automáticamente
    }
  }
}
