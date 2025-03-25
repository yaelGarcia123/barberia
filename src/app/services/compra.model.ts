export interface Compra {
    compraId: number;
    proveedorId: number;
    precioTotal: number;
    fechaCompra: Date;
    almacenId: number;
    estadoCompra: string;
  
    detallesCompra?: DetalleCompra[];
  }
  
  export interface DetalleCompra {
    id: number;
    compraId: number;
    productoId: number;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
    producto?: {
      id: number;
      nombre: string;
    };
  }