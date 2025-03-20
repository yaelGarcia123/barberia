import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { VentaService } from '../services/venta.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // ✅ Correcto

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;

  purchaseDate: Date = new Date();
  deliveryDate!: string; // Formato YYYY-MM-DD
  deliveryMessage: string = ''; // Texto para el modal

  paymentMethod: string = '';
  address: string = ''; // Aquí vamos a almacenar la dirección del usuario

  cardDetails = {
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  };

  @ViewChild('confirmationModal') confirmationModalRef!: ElementRef;
  modalInstance!: Modal;

  constructor(
    private ventaService: VentaService,
    private router: Router,
    private authService: AuthService // Inyectamos AuthService
  ) {}

  ngOnInit(): void {
    if (history.state.cart) {
      this.cart = history.state.cart;
      this.total = history.state.total;
    }

    this.purchaseDate = new Date();

    // Calcular la fecha de entrega: 2 días después
    const delivery = new Date();
    delivery.setDate(this.purchaseDate.getDate() + 2);
    this.deliveryDate = delivery.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    // Obtener la dirección del usuario desde AuthService
    const userData = this.authService.getUserData(); // Obtener los datos del usuario desde el token
    if (userData) {
      this.address = `${userData.calle} ${userData.num_ext}${userData.num_int ? ' Int. ' + userData.num_int : ''}, ` +
                     `${userData.colonia}, ${userData.ciudad}, C.P. ${userData.codigo_postal}`;
    }
  }

  ngAfterViewInit() {
    this.modalInstance = new Modal(this.confirmationModalRef.nativeElement);
  }

  confirmPurchase() {
    const ventaPayload = {
      cliente_id: 1, // Puedes obtenerlo del login
      metodo_pago_id: this.getMetodoPagoId(this.paymentMethod),
      estado_venta_id: 1, // Ejemplo: 1 = "Pendiente"
      precio_total: this.total,
      fecha_venta: new Date(),
      almacen_id: 1, // Según tu lógica
      detalles: this.cart.map(item => ({
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        subtotal: item.precio * item.cantidad
      }))
    };

    this.ventaService.registrarVenta(ventaPayload).subscribe({
      next: response => {
        console.log('Venta guardada:', response);
        this.setDeliveryMessage(); // Establece el mensaje de entrega
        this.modalInstance.show();
      },
      error: err => {
        console.error('Error al guardar la venta:', err);
        alert('Error al guardar la venta');
      }
    });
  }

  getMetodoPagoId(metodo: string): number {
    if (metodo === 'Tarjeta de Crédito' || metodo === 'Tarjeta de Débito') return 1;
    if (metodo === 'Efectivo') return 2;
    return 3; // Otros
  }

  // Lógica para mostrar mensaje de entrega según la dirección
  setDeliveryMessage() {
    const lowerAddress = this.address.toLowerCase();
    if (lowerAddress.includes('fuera')) {
      this.deliveryMessage = 'La entrega se realizará entre 7 y 10 días hábiles.';
    } else {
      const deliveryDateObj = new Date(this.deliveryDate);
      const formattedDate = deliveryDateObj.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      this.deliveryMessage = `Tu pedido llegará el ${formattedDate}.`;
    }
  }
}
