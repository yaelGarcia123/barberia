import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogisticaService {
  private apiUrl = 'https://localhost:7227/api/Logistica';

  constructor(private http: HttpClient) {}

  obtenerEnvios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  cambiarEstadoEnvio(logisticaId: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${logisticaId}/estado`, { estadoEnvio: nuevoEstado });
  }

  asignarTransporte(logisticaId: number, empresa: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${logisticaId}/transporte`, { empresaTransporte: empresa });
  }
}