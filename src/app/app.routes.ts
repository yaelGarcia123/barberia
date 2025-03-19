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
export const routes: Routes = [



    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Redirecciona la ruta raíz a 'inicio' (opcional)


    { path: 'inicio', component: InicioComponent },
    { path: 'store', component: StoreComponent },
    { path: 'inventario', component: InventarioComponent },
    { path: 'logistica', component: LogisticaComponent },

    { path:'productos', component: ProductosComponent},
    { path: 'Account', component: AccountComponent},
    { path:'Sale', component: SaleComponent},
    { path:'Register', component: RegisterComponent},
    { path:'AdminVentas', component: AdminventasComponent},
    { path:'AdminCompras', component:AdmincomprasComponent}



];




@NgModule({
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule] 
  })
  export class AppRoutingModule { }