import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CompraService } from '../services/compras.service';
import { ProveedoresService } from '../services/proveedores.service';
import { AlmacenService } from '../services/almacen.service';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatOptionModule } from '@angular/material/core'; // Import MatOptionModule
@Component({
  selector: 'app-nuevacompra',
  
  templateUrl: './nuevacompra.component.html',
  styleUrl: './nuevacompra.component.css'
})
export class NuevacompraComponent {
  compraForm: FormGroup;
  proveedores: any[] = [];
  almacenes: any[] = [];
  productos: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private compraService: CompraService,
    private proveedorService: ProveedoresService,
    private almacenService: AlmacenService,
    private productoService: ProductService,
    private dialogRef: MatDialogRef<NuevacompraComponent>,
    private snackBar: MatSnackBar
  ) {
    this.compraForm = this.fb.group({
      proveedorId: ['', Validators.required],
      almacenId: ['', Validators.required],
      estadoCompra: ['Pendiente', Validators.required],
      detallesCompra: this.fb.array([this.createDetalleCompra()])
    });
  }

  ngOnInit(): void {
    this.loadProveedores();
    this.loadAlmacenes();
    this.loadProductos();
  }

  get detallesCompra(): FormArray {
    return this.compraForm.get('detallesCompra') as FormArray;
  }

  createDetalleCompra(): FormGroup {
    return this.fb.group({
      productoId: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0)]],
      subtotal: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addDetalleCompra(): void {
    this.detallesCompra.push(this.createDetalleCompra());
  }

  removeDetalleCompra(index: number): void {
    this.detallesCompra.removeAt(index);
  }

  loadProveedores(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (data) => this.proveedores = data,
      error: (err) => console.error('Error cargando proveedores:', err)
    });
  }

  loadAlmacenes(): void {
    this.almacenService.getAlmacenes().subscribe({
      next: (data) => this.almacenes = data,
      error: (err) => console.error('Error cargando almacenes:', err)
    });
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error cargando productos:', err)
    });
  }

  calcularSubtotal(detalle: any): void {
    const cantidad = detalle.get('cantidad').value;
    const precioUnitario = detalle.get('precioUnitario').value;
    const subtotal = cantidad * precioUnitario;
    detalle.get('subtotal').setValue(subtotal);
  }

  onSubmit(): void {
    if (this.compraForm.invalid) {
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', { duration: 3000 });
      return;
    }

    this.loading = true;
    const compraData = this.compraForm.value;

    // Calcular el precio total sumando todos los subtotales
    compraData.precioTotal = compraData.detallesCompra.reduce((total: number, detalle: any) => total + detalle.subtotal, 0);

    this.compraService.createCompra(compraData).subscribe({
      next: () => {
        this.loading = false;
        this.dialogRef.close('success');
      },
      error: (err) => {
        console.error('Error al crear compra:', err);
        this.snackBar.open('Error al crear la compra', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
