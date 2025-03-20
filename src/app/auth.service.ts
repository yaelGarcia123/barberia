import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7227/api/registro'; // Sin /login

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/inicio']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserName(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.NombreUsuario || decodedToken.Nombre || null;  // Ajusta según cómo venga el nombre
    }
    return null;
  }

  getUserData(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}