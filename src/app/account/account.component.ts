import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

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

  pedidosEnCurso: any[] = [];
  pedidosPasados: any[] = [];
  ventas: any[] = [];

  pasosCompletados: string[] = [];
  pasosRestantes: string[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.cargarDatosUsuario();
    this.cargarPedidos();
    this.cargarVentas();
  }

  cargarDatosUsuario() {
    this.accountService.obtenerPerfil().subscribe(
      (data) => {
        this.perfil = data;
      },
      (error) => {
        console.error('Error al cargar el perfil:', error);
      }
    );
  }

  cargarPedidos() {
    this.accountService.obtenerPedidos().subscribe(
      (data) => {
        this.pedidosEnCurso = data.enCurso;
        this.pedidosPasados = data.pasados;
      },
      (error) => {
        console.error('Error al cargar los pedidos:', error);
      }
    );
  }

  cargarVentas() {
    this.accountService.obtenerVentas().subscribe(
      (data) => {
        this.ventas = data;
      },
      (error) => {
        console.error('Error al cargar las ventas:', error);
      }
    );
  }

  abrirModal(pedidoId: number) {
    if (pedidoId === 1) {
      this.pasosCompletados = ['Pedido realizado', 'Pago confirmado', 'Enviado a la bodega'];
      this.pasosRestantes = ['En camino', 'Entregado al cliente'];
    } else if (pedidoId === 2) {
      this.pasosCompletados = ['Pedido realizado', 'Pago confirmado'];
      this.pasosRestantes = ['Enviado a la bodega', 'En camino', 'Entregado al cliente'];
    }

    const modalElement = document.getElementById('modalEstado');
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('No se encontró el modal con el id "modalEstado"');
    }
  }

  guardarDatos() {
    this.accountService.actualizarPerfil(this.perfil).subscribe(
      () => console.log('Datos guardados exitosamente'),
      (error) => console.error('Error al guardar los datos:', error)
    );
  }

  guardarDireccion() {
    this.accountService.actualizarDireccion(this.perfil.direccion).subscribe(
      () => console.log('Dirección guardada exitosamente'),
      (error) => console.error('Error al guardar la dirección:', error)
    );
  }

  guardarEmpresa() {
    this.accountService.actualizarEmpresa({
      nombreEmpresa: this.perfil.nombreEmpresa,
      ruc: this.perfil.ruc
    }).subscribe(
      () => console.log('Empresa guardada exitosamente'),
      (error) => console.error('Error al guardar la empresa:', error)
    );
  }

  guardarPago() {
    this.accountService.actualizarPago({
      tarjeta: this.perfil.tarjeta,
      fechaExp: this.perfil.fechaExp,
      cvv: this.perfil.cvv
    }).subscribe(
      () => console.log('Método de pago guardado exitosamente'),
      (error) => console.error('Error al guardar el método de pago:', error)
    );
  }

  verEstado(estado: string) {
    console.log(`Estado del pedido: ${estado}`);
  }
}
