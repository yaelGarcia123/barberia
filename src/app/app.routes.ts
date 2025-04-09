import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio/inicio.component';
import { InventarioComponent } from './inventario/inventario.component';
import { StoreComponent } from './store/store.component';
import { LogisticaComponent } from './logistica/logistica.component';
import { ProductosComponent } from './productos/productos.component';
import { AccountComponent } from './account/account.component';
import { SaleComponent } from './sale/sale.component';
import { RegisterComponent } from './register/register.component';
import { AdminventasComponent } from './adminventas/adminventas.component';
import { AdmincomprasComponent } from './admincompras/admincompras.component';
import { InicioadminComponent } from './inicioadmin/inicioadmin.component';
import { AdminusuariosComponent } from './adminusuarios/adminusuarios.component';
import { AdminproveedoresComponent } from './adminproveedores/adminproveedores.component';
import { ComprasComponent } from './compras/compras.component';

import { NuevacompraComponent } from './nuevacompra/nuevacompra.component';

import { RegistroempleadoComponent } from './registroempleado/registroempleado.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { NominaComponent } from './nomina/nomina.component';
import { PercepcionesDeduccionesComponent } from './percepciones-deducciones/percepciones-deducciones.component';
import { ExportarNominaComponent } from './exportar-nomina/exportar-nomina.component';
import { IncapacidadComponent } from './incapacidad/incapacidad.component';

export const routes: Routes = [



    { path: '', redirectTo: 'registro', pathMatch: 'full' }, // Redirecciona la ruta raíz a 'inicio' (opcional)


    { path: 'inicio', component: InicioComponent },
    { path: 'store', component: StoreComponent },
    { path: 'inventario', component: InventarioComponent },
    { path: 'logistica', component: LogisticaComponent },
    { path: 'nuevacompra', component: NuevacompraComponent },
    { path:'productos', component: ProductosComponent},
    { path: 'account', component: AccountComponent},
    { path:'sale', component: SaleComponent},
    { path:'register', component: RegisterComponent},
    { path:'adminventas', component: AdminventasComponent},
    { path:'admincompras', component:AdmincomprasComponent},
    { path: 'inicioadmin', component: InicioadminComponent},
    { path: 'adminusuarios', component: AdminusuariosComponent},
    { path: 'adminproveedores', component: AdminproveedoresComponent},
    { path: 'compras', component: ComprasComponent},
    { path: 'registro', component: RegistroempleadoComponent},
    { path: 'empleados', component: EmpleadosComponent},
    { path: 'nomina', component: NominaComponent},
    { path: 'percepydedu', component : PercepcionesDeduccionesComponent},
    { path: 'exportarnomina', component : ExportarNominaComponent},
    { path: 'incapacidad', component : IncapacidadComponent}



];




@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
