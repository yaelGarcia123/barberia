import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://localhost:7227/api/Registro'; // Reemplaza con la URL real de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Agregar un nuevo cliente
  addCliente(cliente: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, cliente);
  }

  // Actualizar un cliente existente
  
  updateCliente(cliente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${cliente.id}`, cliente);
  }

  // Eliminar un cliente por ID
  deleteCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
