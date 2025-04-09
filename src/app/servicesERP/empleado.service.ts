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
    // Agrega otros headers necesarios como Authorization si es requerido
  });

  constructor(private http: HttpClient) { }

  // Crear un nuevo empleado
  registrarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.apiUrl}`, empleado, { headers: this.headers });
  }

  // Obtener todos los empleados
 
  // Obtener un empleado por ID
  obtenerEmpleadoPorId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/empleados/${id}`, { headers: this.headers });
  }

  // Actualizar un empleado
  actualizarEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/empleados/${id}`, empleado, { headers: this.headers });
  }

  // Eliminar un empleado
  eliminarEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/empleados/${id}`, { headers: this.headers });
  }

  // Buscar empleados por RFC (opcional)
  buscarPorRFC(rfc: string): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/empleados?rfc=${rfc}`, { headers: this.headers });
  }
}