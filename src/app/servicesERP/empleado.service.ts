import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './empleado.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'https://localhost:7260/api/Empleado'; // Reemplaza con tu URL de API base
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Crear un nuevo empleado
  registrarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(
      this.apiUrl, 
      empleado, 
      { headers: this.headers }
    );
  }

 

  // Obtener todos los empleados
  obtenerEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl, { headers: this.headers });
  }

  // Actualizar un empleado
  actualizarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(
      `${this.apiUrl}/${empleado.IdEmpleado}`, 
      empleado, 
      { headers: this.headers }
    );
  }

  // Eliminar un empleado
  eliminarEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
  // Buscar empleados por RFC
  buscarPorRFC(rfc: string): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/empleados?rfc=${rfc}`, { headers: this.headers });
  }
}
