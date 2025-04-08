import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NominaService } from '../servicesERP/nomina.service';
import { PdfService } from '../servicesERP/pdf.service';
import {RegistroService} from '../servicesERP/empleado.service';



@Component({
  selector: 'app-exportar-nomina',
  templateUrl: './exportar-nomina.component.html',
  styleUrls: ['./exportar-nomina.component.css']
})
export class ExportarNominaComponent implements OnInit {
  idNomina: number = 0;
  cargando: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private nominaService: NominaService,
    private empleadoService: RegistroService,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.idNomina = Number(this.route.snapshot.paramMap.get('id'));
    this.generarRecibo();
  }

  generarRecibo(): void {
    this.cargando = true;
    this.error = null;

    // Obtener datos de la nómina
    this.nominaService.obtenerNomina(this.idNomina).subscribe({
      next: (nomina) => {
        // Obtener datos del empleado
        this.empleadoService.buscarPorRFC(nomina.RFC).subscribe({
          next: (empleado) => {
            // Obtener percepciones
            this.nominaService.obtenerPercepciones(this.idNomina).subscribe({
              next: (percepciones) => {
                // Obtener deducciones
                this.nominaService.obtenerDeducciones(this.idNomina).subscribe({
                  next: (deducciones) => {
                    // Generar PDF
                    this.pdfService.generarReciboNomina(
                      empleado,
                      nomina,
                      percepciones,
                      deducciones
                    );
                    this.cargando = false;
                  },
                  error: (err) => this.manejarError(err)
                });
              },
              error: (err) => this.manejarError(err)
            });
          },
          error: (err) => this.manejarError(err)
        });
      },
      error: (err) => this.manejarError(err)
    });
  }

  private manejarError(error: any): void {
    this.error = 'Error al generar el recibo de nómina. Por favor intente nuevamente.';
    this.cargando = false;
    console.error(error);
  }
}