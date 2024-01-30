import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './componentes/zonaCliente/registroComponent/registro.component';
import { LoginComponent } from './componentes/zonaCliente/loginComponent/login.component';
import { RegistrookComponent } from './componentes/zonaCliente/registroOKComponent/registrook.component';
import { LibrosComponentComponent } from './componentes/zonaTienda/librosComponent/libros-component.component';
import { DetallesLibroComponent } from './componentes/zonaTienda/detallesLibroComponent/detalles-libro.component';

//modulo principal de enrutamiento usado por el modulo global de la aplicacion app.module.ts
//necesitan tener definidos un array de objetos de tipo interface Route
const routes: Routes = [
  { path: 'Cliente',
    children:[
              { path: 'Registro', component: RegistroComponent },
              { path: 'Login', component: LoginComponent },
              {path: 'RegistroOk', component: RegistrookComponent},
    ]  
  } ,
  {
    path:'Tienda',
    children:[
      {path:'Libros/:idcat', component: LibrosComponentComponent},
      {path:'MostarLibro/:idcat', component: DetallesLibroComponent},

    ]
  },
  { path: '', redirectTo: '/Tienda/Libros/2-10', pathMatch:'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
