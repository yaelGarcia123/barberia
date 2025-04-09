import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './empleado.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'tu-api-url/aqui'; // Reemplaza con tu URL de API base
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Crear un nuevo empleado
  registrarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.apiUrl}/empleados`, empleado, { headers: this.headers });
  }

  // Obtener un empleado por ID
  obtenerEmpleadoPorId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/empleados/${id}`, { headers: this.headers });
  }

  // Obtener todos los empleados
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/empleados`);
  }

  // Actualizar un empleado
  actualizarEmpleado(empleado: Empleado): Observable<any> {
    return this.http.put(`${this.apiUrl}/empleados/${empleado.IdEmpleado}`, empleado, { headers: this.headers });
  }

  // Eliminar un empleado
  eliminarEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/empleados/${id}`, { headers: this.headers });
  }

  // Buscar empleados por RFC
  buscarPorRFC(rfc: string): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/empleados?rfc=${rfc}`, { headers: this.headers });
  }
}
