import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Empleado {
  idEmpleado: number;
  rfc: string;
  tipoContrato: string;
  nombre: string;
  apellido: string;
  puesto: string;
  modoPago: string;
  correo: string;
  departamento: string;
  direccion: string;
  telefono: string;
  fechaIngreso: string;
  salario: number;
}
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

<<<<<<< HEAD
  // Obtener todos los empleados
 
=======
>>>>>>> 8606a353c755d6522db816e638d036ee1cc186ec
  // Obtener un empleado por ID
  obtenerEmpleadoPorId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/empleados/${id}`, { headers: this.headers });
  }
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  actualizarEmpleado(empleado: Empleado): Observable<any> {
    return this.http.put(`${this.apiUrl}/${empleado.idEmpleado}`, empleado);
  }

  eliminarEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Buscar empleados por RFC (opcional)
  buscarPorRFC(rfc: string): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/empleados?rfc=${rfc}`, { headers: this.headers });
  }
}