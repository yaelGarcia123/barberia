import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Nomina {
  idNomina: number;
  rfc: string;
  fecha: string;
  periodo: string;
  sueldoBruto: number;
  totalPercepciones: number;
  totalDeducciones: number;
  sueldoNeto: number;
}

@Injectable({
  providedIn: 'root'
})
export class NominaService {
  private apiUrl = 'https://localhost:7260/api/Nomina';

  constructor(private http: HttpClient) {}

  generarNomina(empleadoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${empleadoId}`, {}); // sin body
  }
  

  obtenerNominas(): Observable<Nomina[]> {
    return this.http.get<Nomina[]>(`${this.apiUrl}`);
  }

  descargarRecibo(nominaId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/recibo/${nominaId}`, { responseType: 'blob' });
  }
}
