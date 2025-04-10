import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NominaService } from '../servicesERP/nomina.service';
import { Empleado, Nomina, Percepciones, Deducciones, ReciboNomina } from '../servicesERP/model';

@Component({
  selector: 'app-recibo-nomina',
  templateUrl: './recibo-nomina.component.html',
  styleUrls: ['./recibo-nomina.component.css']
})
export class ReciboNominaComponent implements OnInit {
  recibo: ReciboNomina | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private nominaService: NominaService
  ) { }

  ngOnInit(): void {
    const rfc = this.route.snapshot.paramMap.get('rfc');
    const periodo = this.route.snapshot.paramMap.get('periodo');

    if (rfc && periodo) {
      this.nominaService.getReciboNomina(rfc, periodo).subscribe({
        next: (data) => {
          this.recibo = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar el recibo de nómina';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.error = 'RFC o período no especificado';
      this.loading = false;
    }
  }

  calcularTotalPercepciones(): number {
    if (!this.recibo?.percepciones) return 0;
    const p = this.recibo.percepciones;
    return p.SueldoBase + p.Puntualidad + p.ValesDespensa + p.Compensaciones + 
           p.Vacaciones + p.PrimaAntiguedad + p.OtrasPrestaciones;
  }

  calcularTotalDeducciones(): number {
    if (!this.recibo?.deducciones) return 0;
    const d = this.recibo.deducciones;
    return d.ISR + d.IMSS + d.INFONAVIT + d.CajaAhorro + 
           d.Prestamos + d.FONACOT + d.CuotaSindical + d.Otras;
  }
}