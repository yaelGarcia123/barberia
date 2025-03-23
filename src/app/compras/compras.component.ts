import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ComprasService } from '../services/compras.service';
import { ProductService } from '../services/product.service';
import { ProveedoresService } from '../services/proveedores.service';
import { AlmacenService } from '../services/almacen.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  compraForm!: FormGroup;
  proveedores: any[] = [];
  productos: any[] = [];
  almacenes: any[] = [];
  detallesCompra!: FormArray;

  constructor(
    private fb: FormBuilder,
    private comprasService: ComprasService,
    private ProveedoresService: ProveedoresService,
    private productService: ProductService,
    private almacenService: AlmacenService
  ) { }

  ngOnInit(): void {
    // Inicializar formulario
    this.compraForm = this.fb.group({
      proveedor_id: ['', Validators.required],
      precio_total: ['', Validators.required],
      fecha_compra: ['', Validators.required],
      almacen_id: [1, Validators.required],  // Valor predeterminado del almacen_id a 1
      estado_compra: [''],
      detallesCompra: this.fb.array([this.crearDetalle()])
    });

    this.detallesCompra = this.compraForm.get('detallesCompra') as FormArray;

    // Obtener datos de la API
    this.ProveedoresService.getProveedores().subscribe(data => this.proveedores = data);
    this.productService.getProductos().subscribe(data => this.productos = data);
    this.almacenService.getAlmacenes().subscribe(data => this.almacenes = data);
  }

  crearDetalle(): FormGroup {
    return this.fb.group({
      producto_id: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precio_unitario: ['', [Validators.required, Validators.min(0)]],
      subtotal: [{ value: '', disabled: true }]
    });
  }

  agregarDetalle(): void {
    this.detallesCompra.push(this.crearDetalle());
  }

  eliminarDetalle(index: number): void {
    this.detallesCompra.removeAt(index);
  }

  calcularSubtotal(index: number): void {
    const detalle = this.detallesCompra.at(index).value;
    const cantidad = detalle.cantidad;
    const precioUnitario = detalle.precio_unitario;
    const subtotal = cantidad * precioUnitario;
    this.detallesCompra.at(index).patchValue({ subtotal });
    this.actualizarPrecioTotal();
  }

  actualizarPrecioTotal(): void {
    let total = 0;
    this.detallesCompra.controls.forEach(detalle => {
      total += detalle.value.subtotal || 0;
    });
    this.compraForm.patchValue({ precio_total: total });
  }

  onSubmit(): void {
    if (this.compraForm.valid) {
      const compraData = this.compraForm.value;

      this.comprasService.crearCompra(compraData).subscribe(response => {
        console.log('Compra guardada', response);
        // Aquí puedes redirigir o hacer lo que necesites después de guardar la compra
      });
    }
  }
}
