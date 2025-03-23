import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  compra = {
    proveedor_id: null,
    precio_total: 0,
    fecha_compra: '',
    almacen_id: null,
    estado_compra: 'Pendiente'
  };

  nuevoProducto = {
    producto_id: null,
    cantidad: 0,
    precio_unitario: 0
  };

  productosDetalle: any[] = [];
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
    this.http.get<any[]>('/api/proveedores').subscribe(data => {
      this.proveedores = data;
    });
  }

  cargarAlmacenes(): void {
    this.http.get<any[]>('/api/almacenes').subscribe(data => {
      this.almacenes = data;
    });
  }

  cargarProductos(): void {
    this.http.get<any[]>('/api/productos').subscribe(data => {
      this.productos = data;
    });
  }

  agregarProducto(): void {
    const cantidad = this.nuevoProducto.cantidad ?? 0;
    const precioUnitario = this.nuevoProducto.precio_unitario ?? 0;
    const subtotal = cantidad * precioUnitario;

    const detalle = {
      producto_id: this.nuevoProducto.producto_id,
      cantidad: cantidad,
      precio_unitario: precioUnitario,
      subtotal: subtotal
    };

    this.productosDetalle.push(detalle);
    this.actualizarPrecioTotal();

    // Limpiar el formulario de producto
    this.nuevoProducto = {
      producto_id: null,
      cantidad: 0,
      precio_unitario: 0
    };
  }

  actualizarPrecioTotal(): void {
    this.compra.precio_total = this.productosDetalle.reduce((total, producto) => total + producto.subtotal, 0);
  }

  guardarCompra(): void {
    const compraData = {
      ...this.compra,
      detalle: this.productosDetalle
    };

    this.http.post('/api/compras', compraData).subscribe(response => {
      console.log('Compra guardada', response);
      // Limpiar formularios tras guardar
      this.compra = {
        proveedor_id: null,
        precio_total: 0,
        fecha_compra: '',
        almacen_id: null,
        estado_compra: 'Pendiente'
      };
      this.productosDetalle = [];
    });
  }
}
