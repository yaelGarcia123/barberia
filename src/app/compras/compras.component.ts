import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ComprasService } from '../services/compras.service';  // Asegúrate de importar el servicio

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  compra: any = {
    proveedor_id: 0,
    precio_total: 0,
    fecha_compra: new Date().toISOString().split('T')[0],
    almacen_id: 0,
    estado_compra: 'Pendiente'
  };

  detallesCompra: any[] = [];
  proveedores: any[] = [];
  almacenes: any[] = [];
  productos: any[] = [];

  constructor(private http: HttpClient, private comprasService: ComprasService) {}  // Inyecta el servicio

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarAlmacenes();
    this.cargarProductos();
  }

  cargarProveedores(): void {
    this.http.get<any[]>('https://localhost:7227/api/Proveedor').subscribe(
      (data) => this.proveedores = data,
      (error) => console.error('Error cargando proveedores:', error)
    );
  }

  cargarAlmacenes(): void {
    this.http.get<any[]>('https://localhost:7227/api/Almacen').subscribe(
      (data) => this.almacenes = data,
      (error) => console.error('Error cargando almacenes:', error)
    );
  }

  cargarProductos(): void {
    this.http.get<any[]>('https://localhost:7227/api/Productos').subscribe(
      (data) => this.productos = data,
      (error) => console.error('Error cargando productos:', error)
    );
  }

  agregarDetalle(): void {
    this.detallesCompra.push({
      producto_id: null,
      cantidad: 1,
      precio_unitario: 0,
      subtotal: 0
    });
  }

  eliminarDetalle(index: number): void {
    this.detallesCompra.splice(index, 1);
    this.calcularPrecioTotal();
  }

  calcularSubtotal(index: number): void {
    const detalle = this.detallesCompra[index];
    detalle.subtotal = detalle.cantidad * detalle.precio_unitario;
    this.calcularPrecioTotal();
  }

  calcularPrecioTotal(): void {
    this.compra.precio_total = this.detallesCompra.reduce(
      (total, detalle) => total + detalle.subtotal,
      0
    );
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      // Preparar los datos de la compra
      const compraData = {
        proveedorId: this.compra.proveedor_id,
        precioTotal: this.compra.precio_total,
        fechaCompra: this.compra.fecha_compra,
        almacenId: this.compra.almacen_id,
        estadoCompra: this.compra.estado_compra,
        detallesCompra: this.detallesCompra.map(detalle => ({
          productoId: detalle.producto_id,
          cantidad: detalle.cantidad,
          precioUnitario: detalle.precio_unitario,
          subtotal: detalle.subtotal
        }))
      };
  
      console.log('Datos enviados:', compraData);  // Depuración
  
      // Enviar la compra al backend
      this.comprasService.crearCompra(compraData).subscribe(
        (response) => {
          console.log('Compra guardada:', response);
          alert('Compra guardada exitosamente');
          this.resetForm(form);
        },
        (error) => {
          console.error('Error guardando la compra:', error);
          alert('Error al guardar la compra');
        }
      );
    }
  }
  resetForm(form: NgForm): void {
    form.resetForm();
    this.compra = {
      proveedor_id: null,
      precio_total: 0,
      fecha_compra: new Date().toISOString().split('T')[0],
      almacen_id: null,
      estado_compra: 'Pendiente'
    };
    this.detallesCompra = [];
  }
}