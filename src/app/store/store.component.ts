import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; // Importar el servicio

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  costo: number;
  precio: number;
  impuesto: number;
  existencia: number;
  status: boolean;
 
}

interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  total: number; // Precio total con impuesto
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  products: Product[] = [];
  cart: CartItem[] = [];
  cartVisible: boolean = false;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductos().subscribe(
      (data: Product[]) => {
        this.products = data
          .filter(product => product.status) // Mostrar solo productos activos
          .map(product => ({
            ...product,
            precio: parseFloat(product.precio.toFixed(2)), // Asegurar formato de precio
            impuesto: parseFloat(product.impuesto.toFixed(2)) // Asegurar formato de impuesto
          }));
      },
      (error) => {
        console.error('Error al cargar productos', error);
      }
    );
  }

  toggleCartVisibility(event: Event): void {
    event.preventDefault();
    this.cartVisible = !this.cartVisible;
  }

  addToCart(product: Product, quantityInput: HTMLInputElement): void {
    const quantity = parseInt(quantityInput.value, 10);
    if (quantity <= 0 || isNaN(quantity)) {
      alert('Ingresa una cantidad válida.');
      return;
    }

    if (product.existencia < quantity) {
      alert(`Solo quedan ${product.existencia} unidades disponibles.`);
      return;
    }

    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.cantidad + quantity > product.existencia) {
        alert(`No puedes agregar más de ${product.existencia} unidades.`);
        return;
      }
      existingItem.cantidad += quantity;
      existingItem.total = existingItem.cantidad * (product.precio * (1 + product.impuesto / 100));
    } else {
      this.cart.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: quantity,
        total: quantity * (product.precio * (1 + product.impuesto / 100))
      });
    }

    quantityInput.value = '1'; // Reiniciar input
  }

  removeFromCart(id: number): void {
    this.cart = this.cart.filter(item => item.id !== id);
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.total, 0);
  }

  goToSale(): void {
    if (this.cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    this.router.navigate(['/sale'], { state: { cart: this.cart, total: this.getTotal() } });
    this.clearCart();
  }

  clearCart(): void {
    this.cart = [];
  }
}
