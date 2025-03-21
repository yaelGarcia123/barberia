import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-adminusuarios',
  templateUrl: './adminusuarios.component.html',
  styleUrls: ['./adminusuarios.component.css']
})
export class AdminusuariosComponent implements OnInit {
  clientes: any[] = [];
  selectedCliente: any = {};
  isEdit: boolean = false;

  private clienteModal: bootstrap.Modal | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe((data: any[]) => {
      this.clientes = data;
    });
  }

  openModal(cliente: any = null): void {
    this.isEdit = !!cliente;
    this.selectedCliente = cliente ? { ...cliente } : {
      nombre: '',
      apellidoaterno: '',
      apellidoMaterno: '',
      rfc: '',
      codigoPostal: '',
      calle: '',
      numExt: '',
      numInt: '',
      colonia: '',
      ciudad: '',
      nombreUsuario: '',
      password: '',
      sexo: ''
    };

    const modalElement = document.getElementById('addClienteModal');
    if (modalElement) {
      this.clienteModal = new bootstrap.Modal(modalElement);
      this.clienteModal.show();
    }
  }

  saveCliente(): void {
    if (this.isEdit) {
      this.clienteService.updateCliente(this.selectedCliente).subscribe(() => {
        this.getClientes();
        this.closeModal();
      });
    } else {
      this.clienteService.addCliente(this.selectedCliente).subscribe(() => {
        this.getClientes();
        this.closeModal();
      });
    }
  }

  deleteCliente(id: number): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe(() => {
        this.getClientes();
      });
    }
  }

  closeModal(): void {
    if (this.clienteModal) {
      this.clienteModal.hide();
    }
  }
}
