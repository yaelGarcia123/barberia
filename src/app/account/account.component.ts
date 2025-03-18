import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  perfil = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    esEmpresa: false,
    nombreEmpresa: '',
    ruc: '',
    tarjeta: '',
    fechaExp: '',
    cvv: ''
  };

  pedidosEnCurso = [
    { id: 1, estado: 'En Proceso', fecha: '2025-03-10' },
    { id: 2, estado: 'Enviado', fecha: '2025-03-12' }
  ];

  pedidosPasados = [
    { id: 3, estado: 'Entregado', fecha: '2025-02-28' },
    { id: 4, estado: 'Entregado', fecha: '2025-02-20' }
  ];

  pasosCompletados: string[] = [];
  pasosRestantes: string[] = [];

  abrirModal(pedidoId: number) {
    // Lógica para asignar los pasos completos y restantes según el pedido
    if (pedidoId === 1) {
      this.pasosCompletados = [
        'Pedido realizado',
        'Pago confirmado',
        'Enviado a la bodega'
      ];
      this.pasosRestantes = [
        'En camino',
        'Entregado al cliente'
      ];
    } else if (pedidoId === 2) {
      this.pasosCompletados = [
        'Pedido realizado',
        'Pago confirmado'
      ];
      this.pasosRestantes = [
        'Enviado a la bodega',
        'En camino',
        'Entregado al cliente'
      ];
    }
  
    // Verifica que el elemento no sea null antes de crear el modal
    const modalElement = document.getElementById('modalEstado');
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('No se encontró el modal con el id "modalEstado"');
    }
  }

  guardarDatos() {
    // Lógica para guardar los datos personales
    console.log('Datos guardados', this.perfil);
  }

  guardarDireccion() {
    // Lógica para guardar dirección
    console.log('Dirección guardada', this.perfil.direccion);
  }

  guardarEmpresa() {
    // Lógica para guardar empresa
    console.log('Empresa guardada', this.perfil);
  }

  guardarPago() {
    // Lógica para guardar método de pago
    console.log('Método de pago guardado', this.perfil);
  }

  verEstado(estado: string) {
    // Lógica para ver más detalles sobre el estado del pedido
    console.log(`Estado del pedido: ${estado}`);
  }
}
