import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Producto = { nombre: '' };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  agregarProducto() {
    if (this.nuevoProducto.nombre.trim()) {
      this.productoService
        .agregarProducto(this.nuevoProducto)
        .subscribe((producto) => {
          this.productos.push(producto);
          this.nuevoProducto = { nombre: '' };
        });
    }
  }

  eliminarProducto(id?: number) {
    if (id) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.productos = this.productos.filter((p) => p.id !== id);
      });
    }
  }
}
