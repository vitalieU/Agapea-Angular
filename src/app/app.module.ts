import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//----------------- modulos secundarios hijos del modulo principal de la aplicacion ----------------
 // AppRoutingModule: modulo encargardo de detectar variacion de url en navegador y en funcion de su fich.configuracion:  app-routing.module.ts
 // carga un componente u otro
import { AppRoutingModule } from './app-routing.module';

//HttpClientModule: modulo encargado de dar inyeccion de servicios comumes para hacer pet.HTTP externas
//usando servicio HttpClient....tb permite definicion INTERCEPTORS
import { HttpClientModule } from '@angular/common/http';

//ReactiveFormsModule: modulo donde se definen directivas a usar en vistas de componentes para mapear objetos FormGroup y FormControl
//contra elemenos del dom (directivas formGroup y formControlName)
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

//-------------------- componentes del modulo principal de la aplicacion----------------------------
import { AppComponent } from './app.component';
import { RegistroComponent } from './componentes/zonaCliente/registroComponent/registro.component';

//-------------------- directivas del modulo princiapal de la aplicacion ---------------------------
import { LoginComponent } from './componentes/zonaCliente/loginComponent/login.component';

//-------------------- pipes del modulo princiapal de la aplicacion --------------------------------
//-------------------- servicios del modulo princiapal de la aplicacion -----------------------------
import RestnodeService from './servicios/restnode.service';
import { EmailfilterdomainDirective } from './directivas/emailfilterdomain.directive';
import { CheckemailexistsDirective } from './directivas/checkemailexists.directive';
import { RegistrookComponent } from './componentes/zonaCliente/registroOKComponent/registrook.component';
import { PanelclienteComponent } from './componentes/zonaCliente/panelClienteComponent/panelcliente.component';
import { PaneltiendaComponent } from './componentes/zonaTienda/panelTiendaComponent/paneltienda.component';
import { RedondeocantidadPipe } from './pipes/redondeocantidad.pipe';
import { LibrosComponentComponent } from './componentes/zonaTienda/librosComponent/libros-component.component';
import { DetallesLibroComponent } from './componentes/zonaTienda/detallesLibroComponent/detalles-libro.component';
import { MiniLibroComponent } from './componentes/zonaTienda/miniLibroComponent/mini-libro.component';


@NgModule({
  declarations: [ //<------ array con defs. de componentes, directivas y pipes disponibles para toda la aplicacion
    AppComponent,
    RegistroComponent,
    LoginComponent,
    EmailfilterdomainDirective,
    CheckemailexistsDirective,
    RegistrookComponent,
    PanelclienteComponent,
    PaneltiendaComponent,
    RedondeocantidadPipe,
    LibrosComponentComponent,
    DetallesLibroComponent,
    MiniLibroComponent,
    
  ],
  imports: [ //<------------ array con modulos secundiarios q tu aplicacion va a usar
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    RestnodeService
  ], //<-------- array para definir inyeccion de dependencias de servicios usados por componentes
  bootstrap: [AppComponent]
})
export class AppModule { }
