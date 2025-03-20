import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../services/inventario.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = {
    id: null,
    nombre: '',
    descripcion: '',
    categoria: '',
    costo: 0,
    precio: 0,
    impuesto: 0,
    existencia: 0,
    status: true
  };
  isEdit: boolean = false;

  constructor(private inventoryService: InventarioService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Cargar productos desde la API
  loadProducts(): void {
    this.inventoryService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  // Mostrar el modal para agregar o editar productos
  openModal(product?: any): void {
    if (product) {
      this.selectedProduct = { ...product };
      this.isEdit = true;
    } else {
      this.selectedProduct = {
        id: null,
        nombre: '',
        descripcion: '',
        categoria: '',
        costo: 0,
        precio: 0,
        impuesto: 0,
        existencia: 0,
        status: true
      };
      this.isEdit = false;
    }

    // Verificar que el modal existe antes de crear la instancia
    const modalElement = document.getElementById('addProductModal');
    if (modalElement) {
      const addProductModal = new bootstrap.Modal(modalElement);
      addProductModal.show();
    }
  }

  // Guardar producto (agregar o actualizar)
  saveProduct(): void {
    if (this.isEdit) {
      this.inventoryService.updateProduct(this.selectedProduct).subscribe(() => {
        this.loadProducts(); // Recargar productos
        this.closeModal();
      });
    } else {
      this.inventoryService.addProduct(this.selectedProduct).subscribe(() => {
        this.loadProducts(); // Recargar productos
        this.closeModal();
      });
    }


  }

  // Eliminar producto
  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.inventoryService.deleteProduct(id).subscribe(() => {
        this.loadProducts(); // Recargar productos
      });
    }
  }

  // Cerrar el modal
  closeModal(): void {
    const modalElement = document.getElementById('addProductModal');
    if (modalElement) {
      const addProductModal = new bootstrap.Modal(modalElement);
      addProductModal.hide();
    }
  }
}