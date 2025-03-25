import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompraService } from '../services/compras.service'; // Corregido el nombre del servicio
import { Compra } from '../services/compra.model'; // Asegúrate de que la ruta del modelo sea correcta
import { AdmincomprasComponent } from '../admincompras/admincompras.component';
import { NuevacompraComponent } from '../nuevacompra/nuevacompra.component';
@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  compras: Compra[] = [];
  loading = true;
  displayedColumns: string[] = ['compraId', 'fecha', 'proveedor', 'almacen', 'total', 'estado', 'acciones'];

  constructor(
    private compraService: CompraService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCompras();
  }

  loadCompras(): void {
    this.loading = true;
    this.compraService.getCompras().subscribe({
      next: (data) => {
        this.compras = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar compras:', err);
        this.snackBar.open('Error al cargar las compras', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  openDetalle(compra: Compra): void {
    this.dialog.open(AdmincomprasComponent, {
      width: '800px',
      data: { compra }
    });
  }

  openNuevaCompra(): void {
    const dialogRef = this.dialog.open(NuevacompraComponent, {
      height:'500px',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadCompras();
        this.snackBar.open('Compra creada exitosamente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  deleteCompra(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta compra?')) {
      this.compraService.deleteCompra(id).subscribe({
        next: () => {
          this.loadCompras();
          this.snackBar.open('Compra eliminada exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error al eliminar compra:', err);
          this.snackBar.open('Error al eliminar la compra', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  // Método para obtener la clase CSS según el estado
  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pendiente': return 'estado-pendiente';
      case 'completada': return 'estado-completada';
      case 'cancelada': return 'estado-cancelada';
      default: return '';
    }
  }
}