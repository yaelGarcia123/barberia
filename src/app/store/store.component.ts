import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
// Lista de productos
products: Product[] = [
  { id: 1, name: 'Producto 1', price: 100, image: 'https://via.placeholder.com/300x200' },
  { id: 2, name: 'Producto 2', price: 150, image: 'https://via.placeholder.com/300x200' },
  { id: 3, name: 'Producto 3', price: 200, image: 'https://via.placeholder.com/300x200' },
  { id: 4, name: 'Producto 4', price: 250, image: 'https://via.placeholder.com/300x200' }
];

// Variables del carrito
cart: Product[] = [];
cartCount: number = 0;

// Añadir producto al carrito
addToCart(product: Product) {
  this.cart.push(product);
  this.cartCount = this.cart.length;
}

// Eliminar producto del carrito
removeFromCart(productId: number) {
  this.cart = this.cart.filter(item => item.id !== productId);
  this.cartCount = this.cart.length;
}

// Calcular el total del carrito
getTotal() {
  return this.cart.reduce((total, item) => total + item.price, 0);
}

// Mostrar/Ocultar carrito
toggleCartVisibility() {
  const cartDropdown = document.getElementById('cart-dropdown');
  if (cartDropdown) {
    cartDropdown.style.display = cartDropdown.style.display === 'none' || cartDropdown.style.display === '' ? 'block' : 'none';
  }
}
}