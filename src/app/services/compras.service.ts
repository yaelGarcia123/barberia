import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../services/compra.model';
import { environment } from '../../app/services/enviorenment';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = `${environment.apiUrl}/api/Compra`;

  constructor(private http: HttpClient) { }

  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.apiUrl);
  }

  getCompra(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.apiUrl}/${id}`);
  }

  createCompra(compra: Compra): Observable<Compra> {
    return this.http.post<Compra>(this.apiUrl, compra);
  }

  updateCompra(id: number, compra: Compra): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, compra);
  }

  deleteCompra(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}