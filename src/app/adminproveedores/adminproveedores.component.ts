import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-adminproveedores',
  templateUrl: './adminproveedores.component.html',
  styleUrls: ['./adminproveedores.component.css']
})
export class AdminproveedoresComponent {
  proveedor = {
    nombre: '',
    tipo: '',
    rfc: '',
    codigoPostal: '', // Asegúrate de que coincida con el nombre en la API
    calle: '',
    numExt: '', // Asegúrate de que coincida con el nombre en la API
    numInt: '', // Asegúrate de que coincida con el nombre en la API
    colonia: '',
    ciudad: ''
  };

  constructor(private http: HttpClient) {}

  guardarProveedor() {
    // Enviar los datos del proveedor a la API
    this.http.post('https://localhost:7227/api/Proveedor', this.proveedor)
      .subscribe({
        next: (response) => {
          console.log('Proveedor guardado:', response);
          alert('Proveedor guardado correctamente'); // Notificación al usuario
          this.resetForm(); // Limpiar el formulario después de guardar
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('Error al guardar el proveedor'); // Notificación al usuario
        }
      });
  }

  resetForm() {
    // Limpiar el formulario
    this.proveedor = {
      nombre: '',
      tipo: '',
      rfc: '',
      codigoPostal: '',
      calle: '',
      numExt: '',
      numInt: '',
      colonia: '',
      ciudad: ''
    };
  }
}