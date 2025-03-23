// logistica.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.component.html'
})
export class LogisticaComponent implements OnInit {
  envios: any[] = [];
  estadosEnvio: string[] = ['Pendiente', 'Preparando', 'En camino', 'Entregado', 'Cancelado'];
  empresasTransporte: string[] = ['DHL', 'FedEx', 'UPS', 'Estafeta', '99 Minutos'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarEnvios();
  }
  obtenerValor(event: Event): string {
    const target = event.target as HTMLSelectElement;
    return target.value;
  }
  cargarEnvios() {
    this.http.get<any[]>('https://tuapi.com/api/logistica')
      .subscribe({
        next: data => this.envios = data,
        error: err => console.error('Error cargando envíos:', err)
      });
  }

  cambiarEstadoEnvio(logisticaId: number, nuevoEstado: string) {
    this.http.put(`https://tuapi.com/api/logistica/${logisticaId}/estado`, { estado_envio: nuevoEstado })
      .subscribe({
        next: () => {
          this.envios.find(e => e.logistica_id === logisticaId).estado_envio = nuevoEstado;
          console.log(`Estado actualizado a ${nuevoEstado}`);
        },
        error: err => console.error('Error al cambiar estado:', err)
      });
  }

  asignarTransporte(logisticaId: number, empresa: string) {
    this.http.put(`https://tuapi.com/api/logistica/${logisticaId}/transporte`, { empresa_transporte: empresa })
      .subscribe({
        next: () => {
          this.envios.find(e => e.logistica_id === logisticaId).empresa_transporte = empresa;
          console.log(`Transporte asignado: ${empresa}`);
        },
        error: err => console.error('Error asignando transporte:', err)
      });
  }
}
