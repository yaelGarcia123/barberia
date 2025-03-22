import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'https://localhost:7227/api/Ventas';// Cambia por tu URL real

  constructor(private http: HttpClient, private authService: AuthService) {}

  registrarVenta(ventaData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ventaData);
  }
  obtenerVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  crearVenta(ventaRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, ventaRequest);
  }
}
