import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogisticaService {
  private orders: Order[] = [
    { id: 1, cliente: 'Juan Pérez', direccion: 'Av. Siempre Viva 742', estado: 'Pendiente', fecha: '2025-03-14' },
    { id: 2, cliente: 'María Gómez', direccion: 'Calle Falsa 123', estado: 'En tránsito', repartidor: 'Carlos', fecha: '2025-03-14' },
  ];

  private ordersSubject = new BehaviorSubject<Order[]>(this.orders);
  orders$ = this.ordersSubject.asObservable();

  constructor() {}

  assignRepartidor(orderId: number, repartidor: string) {
    const index = this.orders.findIndex(order => order.id === orderId);
    if (index !== -1) {
      this.orders[index].repartidor = repartidor;
      this.orders[index].estado = 'En tránsito';
      this.ordersSubject.next([...this.orders]);
    }
  }
}
