
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './empleado.model';


export interface Nomina {
  idNomina: number;
  RFC: string;
  fecha: Date | string;
  periodo: string; // Formato: "Quincena dd/MM/yyyy al dd/MM/yyyy"
  diasPagados: number;
  tipoPago: string;
 
  sueldoBruto: number;
  totalPercepciones: number;
  totalDeducciones: number;
  sueldoNeto: number;
  
  // Relaciones
  empleado?: Empleado;
}

@Injectable({
  providedIn: 'root'
})
export class NominaService {
  private apiUrl = 'https://localhost:7260/api/Nomina';

  constructor(private http: HttpClient) { }

  obtenerNominas(fechaInicio?: string, fechaFin?: string): Observable<Nomina[]> {
    let url = this.apiUrl;
    
    // Agregar parámetros de filtro si existen
    if (fechaInicio && fechaFin) {
      url += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    }
    
    return this.http.get<Nomina[]>(url);
  }

  generarNomina(empleadoId: number, fechaInicio?: string, fechaFin?: string): Observable<any> {
    let url = `${this.apiUrl}/${empleadoId}`;
    
    if (fechaInicio && fechaFin) {
      url += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    }
    
    return this.http.post(url, {});
  }

  descargarRecibo(nominaId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/recibo/${nominaId}`, {
      responseType: 'blob'
    });
  }
}