import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  private apiUrl = 'https://localhost:7227/api/Almacen';  // URL de tu API, ajústala según sea necesario

  constructor(private http: HttpClient) { }

  // Obtener todos los almacenes
  getAlmacenes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un almacén por ID
  getAlmacenById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo almacén
  crearAlmacen(almacen: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, almacen);
  }

  // Actualizar un almacén existente
  actualizarAlmacen(id: number, almacen: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, almacen);
  }

  // Eliminar un almacén
  eliminarAlmacen(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
