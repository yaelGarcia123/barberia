import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'https://localhost:7227/api/Ventas'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para crear una venta
  crearVenta(ventaRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, ventaRequest);
  }
}




