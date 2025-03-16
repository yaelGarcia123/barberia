import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // Importación que falta
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { InicioComponent } from './inicio/inicio.component';
import { InventarioComponent } from './inventario/inventario.component';
import { StoreComponent } from './store/store.component';
import { LogisticaComponent } from './logistica/logistica.component';
import { ProductosComponent } from './productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InventarioComponent,
    StoreComponent,
    LogisticaComponent,
    ProductosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule, // ¡Aquí lo agregamos!
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
