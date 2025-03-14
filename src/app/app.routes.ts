import { RouterModule, Routes } from '@angular/router'; 
import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio/inicio.component';
export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Redirecciona la ruta raíz a 'inicio' (opcional)

    { path: 'inicio', component: InicioComponent },


];




@NgModule({
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule] 
  })
  export class AppRoutingModule { }