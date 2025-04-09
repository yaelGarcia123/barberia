import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {

  private apiUrl = 'https://localhost:7227/api/detallecompra';  // Ajusta el endpoint según tu API

  constructor(private http: HttpClient) { }

  // Obtener detalles de una compra específica por ID de compra
  obtenerDetallesCompra(compraId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${compraId}`);
  }

  // Agregar un nuevo detalle de compra
  agregarDetalleCompra(detalleCompra: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, detalleCompra);
  }

  // Editar un detalle de compra existente
  actualizarDetalleCompra(detalleCompra: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${detalleCompra.id}`, detalleCompra);
  }

  // Eliminar un detalle de compra
  eliminarDetalleCompra(detalleCompraId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${detalleCompraId}`);
  }
}
