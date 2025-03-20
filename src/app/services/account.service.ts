import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://tu-api.com'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  obtenerPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/perfil`);
  }

  actualizarPerfil(perfil: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/perfil`, perfil);
  }

  obtenerPedidos(): Observable<{ enCurso: any[], pasados: any[] }> {
    return this.http.get<{ enCurso: any[], pasados: any[] }>(`${this.apiUrl}/pedidos`);
  }

  actualizarDireccion(direccion: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/perfil/direccion`, { direccion });
  }

  actualizarEmpresa(empresa: { nombreEmpresa: string, ruc: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/perfil/empresa`, empresa);
  }

  actualizarPago(pago: { tarjeta: string, fechaExp: string, cvv: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/perfil/pago`, pago);
  }

  obtenerVentas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ventas`);
  }
}
