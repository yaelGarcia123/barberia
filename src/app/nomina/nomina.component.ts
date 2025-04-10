import { Component, OnInit } from '@angular/core';
import { NominaService, Nomina, NominaRequest } from '../servicesERP/nomina.service';

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent implements OnInit {
  nominas: Nomina[] = [];
  nuevaNomina: NominaRequest = {
    rfc: '',
    periodo: '',
    diasPagados: 0,
    tipoPago: ''
  };

  constructor(private nominaService: NominaService) {}

  ngOnInit(): void {
    this.obtenerNominas();
  }

  obtenerNominas(): void {
    this.nominaService.obtenerNominas().subscribe(data => {
      this.nominas = data;
    });
  }

  crearNomina(): void {
    this.nominaService.crearNomina(this.nuevaNomina).subscribe(() => {
      this.obtenerNominas();
      alert('Nómina creada correctamente');
    });
  }

  descargarPdf(id: number): void {
    this.nominaService.generarPdf(id).subscribe(pdf => {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
