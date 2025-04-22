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

<<<<<<< HEAD
  generarNomina(empleadoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${empleadoId}`, {}); // sin body
  }
  

  obtenerNominas(): Observable<Nomina[]> {
    return this.http.get<Nomina[]>(`${this.apiUrl}`);
=======
  registrarNomina(nominaData: any): Observable<any> {
    return this.http.post(this.apiUrl, nominaData);
  }
  obtenerNominas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
>>>>>>> b45b4e7b060691419bce0d2806643efd5a21c813
  }

  descargarRecibo(nominaId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/recibo/${nominaId}`, { responseType: 'blob' });
  }


  obtenerPercepciones(idNomina: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idNomina}/percepciones`);
  }

  obtenerDeducciones(idNomina: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idNomina}/deducciones`);
  }
  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/empleados`);
  }

  getPeriodosNomina(): Observable<string[]> {
    // Suponiendo que tienes 24 períodos ordinarios al año (quincenales)
    return this.http.get<string[]>(`${this.apiUrl}/periodos`);
  }

  getReciboNomina(rfc: string, periodo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/recibo?rfc=${rfc}&periodo=${periodo}`);
  }
}



