import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  products: Product[] = [
    { id: 1, name: "Producto 1", price: 19.99, image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "Producto 2", price: 24.99, image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "Producto 3", price: 15.49, image: "https://via.placeholder.com/300x200" },
    { id: 4, name: "Producto 4", price: 29.99, image: "https://via.placeholder.com/300x200" },
  ];
  constructor(private router: Router) {}
  cart: CartItem[] = [];
  cartVisible: boolean = false;

  toggleCartVisibility(event: Event) {
    event.preventDefault();
    this.cartVisible = !this.cartVisible;
  }

  addToCart(product: Product, quantityInput: HTMLInputElement) {
    const quantity = parseInt(quantityInput.value, 10);
    if (quantity <= 0 || isNaN(quantity)) {
      alert("Ingresa una cantidad válida.");
      return;
    }

    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      });
    }

    quantityInput.value = "1"; // Reiniciar input
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(item => item.id !== id);
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  goToSale() {
    // Navega al componente Sale y pasa los datos del carrito
    this.router.navigate(['/Sale'], { state: { cart: this.cart, total: this.getTotal() } });
}
}