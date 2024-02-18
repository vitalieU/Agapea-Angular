import { ReactiveFormsModule,FormsModule, FormGroup } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {LoginComponent} from'../../componentes/zonaCliente/loginComponent/login.component'
import  {RegistroComponent} from'../../componentes/zonaCliente/registroComponent/registro.component'
import { RegistrookComponent } from '../../componentes/zonaCliente/registroOKComponent/registrook.component';
import { RouterEvent, RouterLink, Routes } from '@angular/router';
import { InicioPanelComponent } from '../../componentes/zonaCliente/inciioPanelComponents/inicio-panel.component';
import { ZonaclienteRoutingModule } from '../zonacliente-routing/zonacliente-routing.module';
import { EmailfilterdomainDirective } from '../../directivas/emailfilterdomain.directive';
import { CheckemailexistsDirective } from '../../directivas/checkemailexists.directive';
import { ModaldireccionesComponent } from '../../componentes/zonaCliente/modalDireccionesComponent/modaldirecciones.component';
import { MinidireccionComponent } from '../../componentes/zonaCliente/miniDireccionComponent/minidireccion.component';
import { STORAGE_SERVICE } from '../../servicios/injecitontokenstorage';
import { SubjectstorageService } from '../../servicios/subjectstorage.service';




@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    RegistrookComponent,
    InicioPanelComponent,
    EmailfilterdomainDirective,
    CheckemailexistsDirective,
    MinidireccionComponent,
    ModaldireccionesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ZonaclienteRoutingModule,
    
    
    
  ],

})
export class ZonaclienteModule { }
