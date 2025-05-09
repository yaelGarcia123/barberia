import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Incapacidad {
  idIncapacidad?: number;
  folioIncapacidad: string;
  rfc: string;
  fechaInicial: string;
  fechaFinal: string;
  motivo: string;
  estatus: string;
  
  // Removemos la propiedad empleado ya que no la necesitamos enviar
}

@Injectable({
  providedIn: 'root'
})
export class IncapacidadService {
  private apiUrl = 'https://localhost:7260/api/Incapacidad';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
      if (error.error && error.error.errors) {
        errorMessage += `\nErrores: ${JSON.stringify(error.error.errors)}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  registrarIncapacidad(incapacidad: Incapacidad): Observable<Incapacidad> {
    const payload = {
      folioIncapacidad: incapacidad.folioIncapacidad,
      rfc: incapacidad.rfc,
      fechaInicial: incapacidad.fechaInicial, // Ya no uses toISOString()
      fechaFinal: incapacidad.fechaFinal,    // El input date ya envía formato correcto
      motivo: incapacidad.motivo,
      estatus: incapacidad.estatus
    };
  
    return this.http.post<Incapacidad>(this.apiUrl, payload).pipe(
      catchError(this.handleError)
    );
  }

  obtenerIncapacidades(): Observable<Incapacidad[]> {
    return this.http.get<Incapacidad[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  eliminarIncapacidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}