import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//modulo principal de enrutamiento usado por el modulo global de la aplicacion app.module.ts
//necesitan tener definidos un array de objetos de tipo interface Route
const routes: Routes = [
  {
    path: 'Cliente',
    loadChildren: () =>
      import('./modulos/zonacliente/zonacliente.module').then(
        (m) => m.ZonaclienteModule
      ),
  },
  {
    path: 'Tienda',
    loadChildren: () =>
      import('./modulos/zonatienda/zonatienda.module').then(
        (m) => m.ZonatiendaModule
      ),
  },
  { path: '', redirectTo: '/Tienda/Libros/2-10', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
