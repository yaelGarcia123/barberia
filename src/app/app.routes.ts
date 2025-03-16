import { RouterModule, Routes } from '@angular/router'; 
import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio/inicio.component';
import { InventarioComponent } from './inventario/inventario.component';
import { StoreComponent } from './store/store.component';
import { LogisticaComponent } from './logistica/logistica.component';
import { ProductosComponent } from './productos/productos.component';
export const routes: Routes = [
    { path: '', redirectTo: 'productos', pathMatch: 'full' }, // Redirecciona la ruta raíz a 'inicio' (opcional)

    { path: 'inicio', component: InicioComponent },
    { path: 'store', component: StoreComponent },
    { path: 'inventario', component: InventarioComponent },
    { path: 'logistica', component: LogisticaComponent },
    {path:'productos', component: ProductosComponent}


];




@NgModule({
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule] 
  })
  export class AppRoutingModule { }