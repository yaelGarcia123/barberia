import { Component, OnInit } from '@angular/core';
import { LogisticaService } from '../services/logistica.service.ts.service';

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.component.html'
})
export class LogisticaComponent implements OnInit {
  envios: any[] = [];
  estadosEnvio: string[] = ['Pendiente', 'Preparando', 'En camino', 'Entregado', 'Cancelado'];
  empresasTransporte: string[] = ['DHL', 'FedEx', 'Estafeta'];

  constructor(private logisticaService: LogisticaService) {}

  ngOnInit() {
    this.cargarEnvios();
  }

  cargarEnvios() {
    this.logisticaService.obtenerEnvios().subscribe({
      next: data => this.envios = data,
      error: err => console.error('Error cargando envíos:', err)
    });
  }

  cambiarEstadoEnvio(logisticaId: number, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const nuevoEstado = selectElement.value;
    
    this.logisticaService.cambiarEstadoEnvio(logisticaId, nuevoEstado).subscribe({
      next: () => {
        const envio = this.envios.find(e => e.logisticaId === logisticaId);
        if (envio) envio.estadoEnvio = nuevoEstado;
      },
      error: err => console.error('Error al cambiar estado:', err)
    });
  }

  asignarTransporte(logisticaId: number, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const empresa = selectElement.value;
    
    this.logisticaService.asignarTransporte(logisticaId, empresa).subscribe({
      next: () => {
        const envio = this.envios.find(e => e.logisticaId === logisticaId);
        if (envio) envio.empresaTransporte = empresa;
      },
      error: err => console.error('Error asignando transporte:', err)
    });
  }
}