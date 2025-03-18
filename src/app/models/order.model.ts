export interface Order {
  id: number;
  cliente: string;
  direccion: string;
  estado: string; // Pendiente, En tránsito, Entregado
  repartidor?: string;
  fecha: string;
}
