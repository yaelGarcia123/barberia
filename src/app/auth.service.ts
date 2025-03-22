import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Importar jwtDecode para decodificar el token

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7227/api/registro'; // Sin /login

  constructor(private http: HttpClient, private router: Router) {}

  // Método para iniciar sesión
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/inicio']);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para obtener el nombre de usuario desde el token
  getUserName(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.NombreUsuario || decodedToken.Nombre || null;  // Ajusta según cómo venga el nombre
    }
    return null;
  }

  // Método para obtener los datos del usuario desde el token
  getUserData(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  // Método para obtener el ID del usuario desde el token
  getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.nameid || null;  // Busca el ID en el campo "nameid"
    }
    return null; // Si no hay token, retornar null
  }
}