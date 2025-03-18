import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(private router: Router) {}

  // Método para manejar el Login
  onSubmit(form: any) {
    const { username, password } = form.value;

    // Validación simple
    if (username === 'admin' && password === '1234') {
      // Redirige a la pantalla de store
      this.router.navigate(['/store']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  // Método para redirigir al registro (Sign Up)
  goToSignUp() {
    this.router.navigate(['/Register']); // Redirige a la pantalla de registro
  }
}
