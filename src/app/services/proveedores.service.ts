// proveedor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private apiUrl = 'https://localhost:7227/api/Proveedor';  // Cambia esta URL por la de tu API

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
