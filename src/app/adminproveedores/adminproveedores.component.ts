import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-adminproveedores',
  templateUrl: './adminproveedores.component.html',
  styleUrl: './adminproveedores.component.css'
})
export class AdminproveedoresComponent {
  proveedor = {
    nombre: '',
    tipo: '',
    rfc: '',
    codigo_postal: '',
    calle: '',
    num_ext: '',
    num_int: '',
    colonia: '',
    ciudad: ''
  };

  constructor(private http: HttpClient) {}

  guardarProveedor() {
    this.http.post('https://tuapi.com/api/proveedores', this.proveedor)
      .subscribe({
        next: (response) => {
          console.log('Proveedor guardado:', response);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
        }
      });
  }
}
