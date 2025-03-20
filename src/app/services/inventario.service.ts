import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl = 'http://tu-api-url/api/productos'; // Cambia esto a tu URL de la API

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar un nuevo producto
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  // Editar un producto
  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${product.id}`, product);
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
