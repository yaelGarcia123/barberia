import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://tu-api.com/api/ventas'; // Cambia por tu URL real

  constructor(private http: HttpClient) {}


  registrarVenta(ventaData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ventaData);
  }
  obtenerVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
