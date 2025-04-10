import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NominaRequest {
  rfc: string;
  periodo: string;
  diasPagados: number;
  tipoPago: string;
}

export interface Nomina {
  idNomina: number;
  rfc: string;
  fecha: string;
  periodo: string;
  diasPagados: number;
  tipoPago: string;
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

  obtenerNominas(): Observable<Nomina[]> {
    return this.http.get<Nomina[]>(this.apiUrl);
  }

  crearNomina(nomina: NominaRequest): Observable<Nomina> {
    return this.http.post<Nomina>(this.apiUrl, nomina);
  }

  obtenerNominaPorId(id: number): Observable<Nomina> {
    return this.http.get<Nomina>(`${this.apiUrl}/${id}`);
  }

  generarPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/GenerarPDF/${id}`, {
      responseType: 'blob'
    });
  }
}
