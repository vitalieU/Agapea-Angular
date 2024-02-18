import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosComponentComponent } from '../../componentes/zonaTienda/librosComponent/libros-component.component';
import { MostrarpedidoComponent } from '../../componentes/zonaTienda/pedidoComponents/pedido-component.component';
import { AccespPedidoGuard } from '../../servicios_GUARDS/acceso-pedido.guard';
import { ZonatiendaRoutingModule } from '../zonatienda-routing/zonatienda-routing.module';
import { ElementopedidoComponent } from '../../componentes/zonaTienda/miniElementoPedidoComponent/mini-elemento-pedido.component';
import { DatosenvioComponent } from '../../componentes/zonaTienda/datosEnvioComponent/datosenvio.component';
import { DatosfacturacionComponent } from '../../componentes/zonaTienda/datosFacturacionComponent/datosfacturacion.component';
import { DatospagoComponent } from '../../componentes/zonaTienda/datosPagoComponent/datospago.component';
import { RedondeocantidadPipe } from '../../pipes/redondeocantidad.pipe';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { MiniLibroComponent } from '../../componentes/zonaTienda/miniLibroComponent/mini-libro.component';
import { DetalleslibroComponent } from '../../componentes/zonaTienda/detallesLibroComponent/detalles-libro.component';
import { FinalizarPedidoOkComponent } from '../../componentes/zonaTienda/finalizarPedidoOkCompnent/finalizar-pedido-ok.component';
import { STORAGE_SERVICE } from '../../servicios/injecitontokenstorage';
import { SubjectstorageService } from '../../servicios/subjectstorage.service';


@NgModule({
  declarations: [
    
    LibrosComponentComponent,
    MostrarpedidoComponent,
    DetalleslibroComponent,
    ElementopedidoComponent,
    MostrarpedidoComponent,
    DatosenvioComponent,
    DatosfacturacionComponent,
    DatospagoComponent,
    RedondeocantidadPipe,
    MiniLibroComponent,
    FinalizarPedidoOkComponent
    ],
  imports: 
  [
    CommonModule,
    ZonatiendaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],


})
export class ZonatiendaModule {}
