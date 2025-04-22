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
import { AdminusuariosComponent } from './adminusuarios/adminusuarios.component';
import { AdminproveedoresComponent } from './adminproveedores/adminproveedores.component';
import { ComprasComponent } from './compras/compras.component';

import { MatIconModule } from '@angular/material/icon'; // <-- Agregar esto
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // <-- Módulo para mat-spinner
import { NuevacompraComponent } from './nuevacompra/nuevacompra.component';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatOptionModule } from '@angular/material/core'; // Import MatOptionModule

import { RegistroempleadoComponent } from './registroempleado/registroempleado.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { NominaComponent } from './nomina/nomina.component';
import { PercepcionesDeduccionesComponent } from './percepciones-deducciones/percepciones-deducciones.component';
import { ExportarNominaComponent } from './exportar-nomina/exportar-nomina.component';
import { IncapacidadComponent } from './incapacidad/incapacidad.component';
import { ReciboNominaComponent } from './recibo-nomina/recibo-nomina.component';




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
    InicioadminComponent,
    AdminusuariosComponent,
    AdminproveedoresComponent,
    ComprasComponent,
    NuevacompraComponent,
    RegistroempleadoComponent,
    EmpleadosComponent,
    NominaComponent,
    PercepcionesDeduccionesComponent,
    ExportarNominaComponent,
    IncapacidadComponent,
    ReciboNominaComponent

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
    HttpClientModule, // 👈 Asegúrate de que esté aquí
    MatIconModule, // <-- Agregar esto
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule, // <-- Agregado aquí
    FormsModule


  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
