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
    this.http.get<any[]>('https://localhost:7227/api/Logistica')
      .subscribe({
        next: data => {
          this.envios = data;
          console.log('Datos cargados:', this.envios);
        },
        error: err => console.error('Error cargando envíos:', err)
      });
  }

  cambiarEstadoEnvio(logisticaId: number, nuevoEstado: string) {
    this.http.put(`https://localhost:7227/api/Logistica/${logisticaId}/estado`, { estadoEnvio: nuevoEstado })
      .subscribe({
        next: () => {
          const envio = this.envios.find(e => e.logisticaId === logisticaId);
          if (envio) {
            envio.estadoEnvio = nuevoEstado;
          }
          console.log(`Estado actualizado a ${nuevoEstado}`);
        },
        error: err => console.error('Error al cambiar estado:', err)
      });
  }

  asignarTransporte(logisticaId: number, empresa: string) {
    this.http.put(`https://localhost:7227/api/Logistica/${logisticaId}/transporte`, { empresaTransporte: empresa })
      .subscribe({
        next: () => {
          const envio = this.envios.find(e => e.logisticaId === logisticaId);
          if (envio) {
            envio.empresaTransporte = empresa;
          }
          console.log(`Transporte asignado: ${empresa}`);
        },
        error: err => console.error('Error asignando transporte:', err)
      });
  }
}