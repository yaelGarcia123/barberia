import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';
import { AuthService } from '../auth.service'; // Importa el AuthService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private registerService: RegisterService,
    private authService: AuthService // Inyecta el AuthService
  ) {}

  onRegister(form: any) {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      rfc,
      codigoPostal,
      calle,
      numExt,
      numInt,
      colonia,
      ciudad,
      nombreUsuario,
      password,
      sexo
    } = form.value;

    if (!nombre || !apellidoPaterno || !codigoPostal || !calle || !numExt || !colonia || !ciudad || !nombreUsuario || !password || !sexo) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const cliente = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      rfc,
      codigoPostal,
      calle,
      numExt,
      numInt,
      colonia,
      ciudad,
      nombreUsuario,
      password,
      sexo
    };

    this.registerService.registerCliente(cliente).subscribe(
      (response) => {
        alert(`¡Registro exitoso!\nBienvenido, ${nombre} ${apellidoPaterno}`);

        // Llamar al método de inicio de sesión con las credenciales del usuario recién registrado
        this.authService.login(nombreUsuario, password).subscribe(
          (loginResponse) => {
            localStorage.setItem('token', loginResponse.token); // Guardar el token en el localStorage
            this.router.navigate(['/store']); // Redirigir al dashboard o a la página principal
          },
          (loginError) => {
            console.error('Error en el inicio de sesión automático', loginError);
            alert('Error en el inicio de sesión automático. Por favor, inicia sesión manualmente.');
          }
        );
      },
      (error) => {
        console.error('Error en el registro:', error);
        alert('Hubo un error en el registro. Por favor, intenta de nuevo.');
      }
    );
  }

  onCancel() {
    this.router.navigate(['/inicio']);
  }
}