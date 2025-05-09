import { Component, OnInit } from '@angular/core';
import { NominaService, Nomina } from '../servicesERP/nomina.service';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../servicesERP/empleado.model';

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent implements OnInit {
  empleados: Empleado[] = [];
  nominas: Nomina[] = [];
  nominasFiltradas: Nomina[] = [];
  empleadoSeleccionado: number | null = null;
  cargando = false;
  
  // Variables para periodo de generación (pueden ser string o null)
  fechaInicio: string | null = null;
  fechaFin: string | null = null;
  
  // Variables para filtrado (pueden ser string o null)
  filtroInicio: string | null = null;
  filtroFin: string | null = null;

  constructor(private nominaService: NominaService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarNominas();
    this.seleccionarPeriodoActual();
  }

  cargarEmpleados() {
    this.http.get<Empleado[]>('https://localhost:7260/api/Empleado').subscribe({
      next: data => this.empleados = data,
      error: error => {
        console.error('Error al cargar empleados:', error);
        alert('Error al cargar empleados');
      }
    });
  }

  cargarNominas() {
    this.cargando = true;
    this.nominaService.obtenerNominas().subscribe({
      next: data => {
        this.nominas = data;
        this.nominasFiltradas = [...data];
        this.cargando = false;
      },
      error: error => {
        console.error('Error al cargar nóminas:', error);
        alert('Error al cargar nóminas');
        this.cargando = false;
      }
    });
  }

  seleccionarPeriodoActual() {
    const hoy = new Date();
    const inicio = hoy.getDate() <= 15 ? 
      new Date(hoy.getFullYear(), hoy.getMonth(), 1) : 
      new Date(hoy.getFullYear(), hoy.getMonth(), 16);
    
    const fin = hoy.getDate() <= 15 ? 
      new Date(hoy.getFullYear(), hoy.getMonth(), 15) : 
      new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    
    this.fechaInicio = this.formatearFecha(inicio);
    this.fechaFin = this.formatearFecha(fin);
  }

  calcularFechaFin() {
    if (!this.fechaInicio) return;
    
    const inicio = new Date(this.fechaInicio);
    const fin = new Date(inicio);
    fin.setDate(inicio.getDate() + 14); // 15 días (quincena)
    
    this.fechaFin = this.formatearFecha(fin);
  }

  formatearFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0];
  }

  generarNomina() {
    if (!this.empleadoSeleccionado) {
      alert('Selecciona un empleado');
      return;
    }

    if (!this.fechaInicio || !this.fechaFin) {
      alert('Selecciona un periodo válido');
      return;
    }

    this.cargando = true;

    this.nominaService.generarNomina(
      this.empleadoSeleccionado, 
      this.fechaInicio, 
      this.fechaFin
    ).subscribe({
      next: () => {
        alert('Nómina generada con éxito');
        this.cargarNominas(); // Recarga las nóminas después de generar
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        console.error('Error detallado:', error);
        if (error.status === 400) {
          alert(error.error || 'Ya existe una nómina para este periodo o datos inválidos');
        } else {
          alert('Error al generar la nómina');
        }
      }
    });
  }

  filtrarNominas() {
    if (!this.filtroInicio && !this.filtroFin) {
      this.nominasFiltradas = [...this.nominas];
      return;
    }

    const inicio = this.filtroInicio ? new Date(this.filtroInicio) : null;
    const fin = this.filtroFin ? new Date(this.filtroFin) : null;

    // Filtrar en memoria basado en el string Periodo
    this.nominasFiltradas = this.nominas.filter(nomina => {
      // Extraer fechas del string Periodo (formato: "Quincena dd/MM/yyyy al dd/MM/yyyy")
      const partes = nomina.periodo?.split(' al ') || [];
      if (partes.length !== 2) return false;
      
      const fechaInicioStr = partes[0].replace('Quincena ', '').trim();
      const fechaFinStr = partes[1].trim();
      
      try {
        const fechaInicioNomina = this.parsearFecha(fechaInicioStr);
        const fechaFinNomina = this.parsearFecha(fechaFinStr);
        
        const cumpleInicio = !inicio || (fechaInicioNomina && fechaInicioNomina >= inicio);
        const cumpleFin = !fin || (fechaFinNomina && fechaFinNomina <= fin);
        
        return cumpleInicio && cumpleFin;
      } catch {
        return false;
      }
    });
  }

  parsearFecha(fechaStr: string): Date | null {
    // Asume formato dd/MM/yyyy
    const partes = fechaStr.split('/');
    if (partes.length !== 3) return null;
    
    // Corrección: Separar las declaraciones y añadir base 10 para parseInt
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const anio = parseInt(partes[2], 10);
    
    if (isNaN(dia) || isNaN(mes) || isNaN(anio)) return null;
    
    return new Date(anio, mes - 1, dia);
  }

  limpiarFiltros() {
    this.filtroInicio = null;
    this.filtroFin = null;
    this.nominasFiltradas = [...this.nominas];
  }

  descargarRecibo(nominaId: number) {
    this.nominaService.descargarRecibo(nominaId).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Obtener el nombre del archivo según el periodo
        const nomina = this.nominas.find(n => n.idNomina === nominaId);
        let nombreArchivo = `recibo_nomina_${nominaId}.pdf`;
        
        if (nomina?.periodo) {
          try {
            const partes = nomina.periodo.split(' al ');
            if (partes.length === 2) {
              const fechaInicio = partes[0].replace('Quincena ', '').replace(/\//g, '');
              const fechaFin = partes[1].replace(/\//g, '');
              nombreArchivo = `recibo_nomina_${nominaId}_${fechaInicio}_al_${fechaFin}.pdf`;
            }
          } catch (e) {
            console.warn('Error al parsear periodo para nombre de archivo', e);
          }
        }
        
        a.download = nombreArchivo;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error detallado:', err);
        if (err.status === 404) {
          alert('Nómina no encontrada');
        } else if (err.status === 400) {
          alert('Datos incompletos para generar el recibo');
        } else {
          alert('Error al generar el PDF. Verifica la consola para más detalles.');
        }
      }
    });
  }
}