import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'https://localhost:7227/api/Ventas'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  crearVenta(ventaRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/GenerarVenta`, ventaRequest);
  }
}