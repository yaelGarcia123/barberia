import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { InicioComponent } from './inicio/inicio.component';
import { InventarioComponent } from './inventario/inventario.component';
import { StoreComponent } from './store/store.component';
import { LogisticaComponent } from './logistica/logistica.component';
import { ProductosComponent } from './productos/productos.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AccountComponent } from './account/account.component';
import { SaleComponent } from './sale/sale.component';
import { RegisterComponent } from './register/register.component';
import { AdmincomprasComponent } from './admincompras/admincompras.component';
import { AdminventasComponent } from './adminventas/adminventas.component';
import { InicioadminComponent } from './inicioadmin/inicioadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InventarioComponent,
    StoreComponent,
    LogisticaComponent,
    ProductosComponent,
    AccountComponent,
    SaleComponent,
    RegisterComponent,
    AdmincomprasComponent,
    AdminventasComponent,
    InicioadminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule, // Asegúrate de agregar este módulo
    MatInputModule,
    MatTableModule,
    HttpClientModule // 👈 Asegúrate de que esté aquí


  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
