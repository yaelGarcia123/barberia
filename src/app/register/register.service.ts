import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    private apiUrl = 'https://localhost:7227/api/registro/registrar';
  constructor(private http: HttpClient) {}

  registerCliente(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }
}