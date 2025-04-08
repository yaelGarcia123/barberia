import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NominaService {
  private apiUrl = 'URL_DE_TU_API/nominas';

  constructor(private http: HttpClient) { }

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
}