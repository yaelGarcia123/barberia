import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private apiUrl = 'https://localhost:7227/api/Compra';  // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) { }

  // Método para crear una nueva compra
  crearCompra(compraData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, compraData);
  }

  // Método para obtener todas las compras
  verCompras(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}