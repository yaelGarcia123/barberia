import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../servicesERP/empleado.model'; // Asegúrate de importar correctamente

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'tu-api-url/aqui'; // Reemplaza con tu URL de API base
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
    // Agrega otros headers necesarios como Authorization si es requerido
  });

  constructor(private http: HttpClient) { }

  // Crear un nuevo empleado
  registrarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.apiUrl}/empleados`, empleado, { headers: this.headers });
  }

  obtenerEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  eliminarEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  actualizarEmpleado(empleado: Empleado): Observable<any> {
    return this.http.put(`${this.apiUrl}/${empleado.IdEmpleado}`, empleado);
  }
}