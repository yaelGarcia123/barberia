import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router, private registerService: RegisterService) {}

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
        this.router.navigate(['/inicio']);
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