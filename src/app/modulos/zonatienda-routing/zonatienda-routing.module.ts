import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosComponentComponent } from '../../componentes/zonaTienda/librosComponent/libros-component.component';
import { DetalleslibroComponent } from '../../componentes/zonaTienda/detallesLibroComponent/detalles-libro.component';
import { MostrarpedidoComponent } from '../../componentes/zonaTienda/pedidoComponents/pedido-component.component';
import { AccespPedidoGuard } from '../../servicios_GUARDS/acceso-pedido.guard';
import { RouterModule, Routes } from '@angular/router';
import { FinalizarPedidoOkComponent } from '../../componentes/zonaTienda/finalizarPedidoOkCompnent/finalizar-pedido-ok.component';

const routes: Routes = [
  
   
  { path: 'Libros/:idcat', component: LibrosComponentComponent },
  { path: 'MostarLibro/:idcat', component: DetalleslibroComponent },
  {
    path: 'MostrarPedido',
    component: MostrarpedidoComponent,
    canActivateChild: [AccespPedidoGuard],
  },
  {path:'MostrarLibro/:isbn13', component:DetalleslibroComponent},
  {path:'FinalizarPedidoOK', component:FinalizarPedidoOkComponent}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class ZonatiendaRoutingModule { }
