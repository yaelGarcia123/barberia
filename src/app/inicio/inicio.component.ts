import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, public  router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response); // Verificar la respuesta
        localStorage.setItem('token', response.token);
        this.router.navigate(['/store']);
      },
      (error) => {
        console.error('Error en el inicio de sesión', error);
        console.error('Detalles del error:', error.error); // Muestra el cuerpo de la respuesta del servidor
        alert('Error en el inicio de sesión. Por favor, intenta de nuevo.');
      }
    );
  }
}