import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Incapacidad {
  idIncapacidad?: number;
  folioIncapacidad: string;
  rfc: string;
  fechaInicial: string;
  fechaFinal: string;
  motivo: string;
  estatus: string;
  empleado?: {
    nombre: string;
    apellido: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class IncapacidadService {
  private apiUrl = 'https://localhost:7260/api/Incapacidad';

  constructor(private http: HttpClient) {}

  registrarIncapacidad(incapacidad: Incapacidad): Observable<Incapacidad> {
    return this.http.post<Incapacidad>(this.apiUrl, incapacidad);
  }

  obtenerIncapacidades(): Observable<Incapacidad[]> {
    return this.http.get<Incapacidad[]>(this.apiUrl);
  }

  eliminarIncapacidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}