import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from '../../componentes/zonaCliente/registroComponent/registro.component';
import { LoginComponent } from '../../componentes/zonaCliente/loginComponent/login.component';
import { RegistrookComponent } from '../../componentes/zonaCliente/registroOKComponent/registrook.component';
import { InicioPanelComponent } from '../../componentes/zonaCliente/inciioPanelComponents/inicio-panel.component';

const routes: Routes = [
  { path: 'Cliente',
    children:[
              { path: 'Registro', component: RegistroComponent },
              { path: 'Login', component: LoginComponent },
              {path: 'RegistroOk', component: RegistrookComponent},
              {path: 'Panel', children:[
                {path: 'InicioPanel', component: InicioPanelComponent},
              ]},
    ]  
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class ZonaclienteRoutingModule { }
