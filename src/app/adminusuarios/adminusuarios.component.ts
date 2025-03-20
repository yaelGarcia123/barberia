import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-adminusuarios',
  templateUrl: './adminusuarios.component.html',
  styleUrls: ['./adminusuarios.component.css']
})
export class AdminusuariosComponent implements OnInit {
  clientes: any[] = [];
  selectedCliente: any = {};
  isEdit: boolean = false;

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
      apellido_paterno: '',
      apellido_materno: '',
      rfc: '',
      codigo_postal: '',
      calle: '',
      num_ext: '',
      num_int: '',
      colonia: '',
      ciudad: '',
      nombre_usuario: '',
      password: '',
      sexo: ''
    };
  }

  saveCliente(): void {
    if (this.isEdit) {
      this.clienteService.updateCliente(this.selectedCliente).subscribe(() => {
        this.getClientes();
      });
    } else {
      this.clienteService.addCliente(this.selectedCliente).subscribe(() => {
        this.getClientes();
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
}
