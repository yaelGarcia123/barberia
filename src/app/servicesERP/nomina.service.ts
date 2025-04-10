import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NominaService {
  private apiUrl = 'URL_DE_TU_API/nominas';

  constructor(private http: HttpClient) { }

  registrarNomina(nominaData: any): Observable<any> {
    return this.http.post(this.apiUrl, nominaData);
  }
  obtenerNominas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerNomina(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
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