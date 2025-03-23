import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  compra: any = {
    proveedor_id: null,
    precio_total: 0,
    fecha_compra: new Date().toISOString().split('T')[0],
    almacen_id: null,
    estado_compra: 'Pendiente'
  };

  detallesCompra: any[] = [];
  proveedores: any[] = [];
  almacenes: any[] = [];
  productos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarAlmacenes();
    this.cargarProductos();
  }

  cargarProveedores(): void {
    this.http.get<any[]>('https://tudominio.com/api/proveedores').subscribe(
      (data) => this.proveedores = data,
      (error) => console.error('Error cargando proveedores:', error)
    );
  }

  cargarAlmacenes(): void {
    this.http.get<any[]>('https://tudominio.com/api/almacenes').subscribe(
      (data) => this.almacenes = data,
      (error) => console.error('Error cargando almacenes:', error)
    );
  }

  cargarProductos(): void {
    this.http.get<any[]>('https://tudominio.com/api/productos').subscribe(
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
      const compraData = {
        ...this.compra,
        detalles: this.detallesCompra
      };

      this.http.post('https://tudominio.com/api/compras', compraData).subscribe(
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