import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {  // Nombre corregido a PascalCase

  private apiUrl = 'https://localhost:7227/api/detalleventa';  // Ajusta el endpoint correcto

  constructor(private http: HttpClient) { }

  // Obtener detalles de una venta por su ID
  obtenerDetallesVenta(ventaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${ventaId}`);
  }
}
