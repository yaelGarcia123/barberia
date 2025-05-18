import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../auth.service';
import { VentaService } from '../services/sale.service'; // Importar el servicio de ventas
import { Modal } from 'bootstrap'; // Importar Modal de Bootstrap

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
  precioBase: number;  // Precio sin impuestos
  impuestoPorcentaje: number; // 16 para 16%
  cantidad: number;
  precioConImpuesto: number; // Precio unitario con impuesto
  totalPorProducto: number; // Cantidad * precio con impuesto

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
  NombreUsuario: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private ventaService: VentaService // Inyectar el servicio de ventas
  ) {}

  ngOnInit(): void {
    this.NombreUsuario = this.authService.getUserName() || '';
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductos().subscribe(
      (data: Product[]) => {
        this.products = data
          .filter(product => product.status)
          .map(product => ({
            ...product,
            precio: parseFloat(product.precio.toFixed(2)),
            impuesto: parseFloat(product.impuesto.toFixed(2))
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
const impuestoDecimal = product.impuesto / 100;
  const precioConImpuesto = product.precio * (1 + impuestoDecimal);

  const existingItem = this.cart.find(item => item.id === product.id);
  if (existingItem) {
    if (existingItem.cantidad + quantity > product.existencia) {
      alert(`No puedes agregar más de ${product.existencia} unidades.`);
      return;
    }
    existingItem.cantidad += quantity;
    existingItem.totalPorProducto = existingItem.cantidad * precioConImpuesto;
  } else {
    this.cart.push({
      id: product.id,
      nombre: product.nombre,
      precioBase: product.precio,
      impuestoPorcentaje: product.impuesto,
      cantidad: quantity,
      precioConImpuesto: precioConImpuesto,
      totalPorProducto: quantity * precioConImpuesto
    });
  }

  quantityInput.value = '1';
}
   
  removeFromCart(id: number): void {
    this.cart = this.cart.filter(item => item.id !== id);
  }

 getTotal(): number {
  return this.cart.reduce((sum, item) => sum + item.totalPorProducto, 0);
}

getSubtotal(): number {
  return this.cart.reduce((sum, item) => sum + (item.precioBase * item.cantidad), 0);
}

getTotalImpuestos(): number {
  return this.getTotal() - this.getSubtotal();
}
  showConfirmSaleModal(): void {
    if (this.cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    const confirmSaleModal = new Modal(document.getElementById('confirmSaleModal')!);
    confirmSaleModal.show();
  }

  confirmSale(): void {
    
    const userId = this.authService.getUserId();
    if (!userId) {
      alert('No se pudo obtener el ID del usuario. Inicia sesión nuevamente.');
      return;
    }
    /*
Swing your partner 'round and 'round
End of the night, it's going down
One more shot, another round
End of the night, it's going down
Swing your partner 'round and 'round
End of the night, it's going down (oh-oh-oh)
One more shot, another round
End of the night, it's going down
    */

    // Crear la solicitud de venta
  const ventaRequest = {
  ClienteId: userId,
  AlmacenId: 1,
  EstadoVentaId: 1,
  Detalles: this.cart.map(item => ({
    ProductoId: item.id,
    Cantidad: item.cantidad,
    Impuesto: item.impuestoPorcentaje // Añadir el impuesto si es necesario
  }))
};

    // Enviar la solicitud al backend
    this.ventaService.crearVenta(ventaRequest).subscribe({
  next: (response: any) => {
    alert(`Venta creada con éxito. ID de venta: ${response.VentaId}`);
    this.clearCart();
    const confirmSaleModal = Modal.getInstance(document.getElementById('confirmSaleModal')!);
    confirmSaleModal?.hide(); // Cerrar el modal
  },
  error: (error) => {
    console.error('Error al crear la venta:', error);

    let errorMessage = 'Hubo un error al procesar la venta. Inténtalo de nuevo.';

    if (error.status === 400) {
      errorMessage = `Error de validación: ${error.error}`;
    } else if (error.status === 404) {
      errorMessage = `Recurso no encontrado: ${error.error}`;
    } else if (error.status === 500) {
      errorMessage = `Error interno del servidor: ${error.error?.message || 'Sin detalles'}`;
      console.error('StackTrace:', error.error?.stackTrace || 'Sin traza de error');
    }

    alert(errorMessage);
  }
  
})
  }


  clearCart(): void {
    this.cart = [];
  }

  logout(): void {
    this.authService.logout();
  }
}