import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../productos/producto.service';
import { Producto } from '../services/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Producto = { id: 0, nombre: '' }; // Nuevo producto que se va a agregar

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  // Obtener todos los productos
  getProductos(): void {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  // Eliminar un producto
  deleteProducto(id: number | undefined): void {
    if (id === undefined) {
      alert('ID no válido');
      return;
    }
    
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe(
        () => {
          // Si la eliminación fue exitosa, actualizamos la lista de productos
          this.getProductos();
          alert('Producto eliminado correctamente');
        },
        (error) => {
          console.error('Error al eliminar el producto', error);
          alert('Hubo un error al eliminar el producto');
        }
      );
    }
  }
  
  // Enviar nuevo producto
  onSubmit(): void {
    if (this.nuevoProducto.nombre.trim()) {
      this.productoService.createProducto(this.nuevoProducto).subscribe(
        (data: Producto) => {
          this.productos.push(data); // Agregar el nuevo producto a la lista
          alert('Producto agregado exitosamente');
          this.nuevoProducto = { id: 0, nombre: '' }; // Limpiar el formulario
        },
        (error) => {
          console.error('Error al agregar el producto', error);
          alert('Hubo un error al agregar el producto');
        }
      );
    } else {
      alert('El nombre del producto es obligatorio');
    }
  }
}
