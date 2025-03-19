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
        localStorage.setItem('token', response.token); // Asume que el backend devuelve un token
        this.router.navigate(['/store']); // Redirige al dashboard o a la página principal
      },
      (error) => {
        console.error('Error en el inicio de sesión', error);
        alert('Usuario o contraseña incorrectos');
      }
    );
  }
}