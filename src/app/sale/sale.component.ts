import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})

export class SaleComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;

  purchaseDate: Date = new Date();
  deliveryDate!: string;
  paymentMethod: string = '';
  address: string = '';

  cardDetails = {
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  };

  

  @ViewChild('confirmationModal') confirmationModalRef!: ElementRef;
  modalInstance!: Modal;

  ngOnInit(): void {
    if (history.state.cart) {
      this.cart = history.state.cart;
      this.total = history.state.total;
    }
  }

  ngAfterViewInit() {
    this.modalInstance = new Modal(this.confirmationModalRef.nativeElement);
  }

  confirmPurchase() {
    console.log('Compra confirmada');
    console.log('Productos:', this.cart);
    console.log('Total:', this.total);
    console.log('Fecha de compra:', this.purchaseDate);
    console.log('Fecha de entrega:', this.deliveryDate);
    console.log('Método de pago:', this.paymentMethod);
    console.log('Dirección:', this.address);

    // Mostrar el modal
    this.modalInstance.show();
  }
}
