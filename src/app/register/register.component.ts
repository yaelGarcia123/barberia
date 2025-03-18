import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
constructor(private router: Router) {}

  // Método para manejar el registro
  onRegister(form: any) {
    const { nombre, apellidos, username, correo, password, direccion } = form.value;

    // Validación básica de campos
    if (!nombre || !apellidos || !username || !correo || !password || !direccion) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Aquí puedes agregar la lógica de registro: guardar en base de datos, etc.

    // Mensaje de éxito
    alert(`¡Registro exitoso!\nBienvenido, ${nombre} ${apellidos}`);
    
    // Redirige a otra página, por ejemplo, a la página de login o dashboard
    this.router.navigate(['/inicio']);
  }
}
