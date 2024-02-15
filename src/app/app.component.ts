import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { Observable, filter, map, switchMap } from 'rxjs';
import { ICategoria } from './model/categoria';
import RestnodeService from './servicios/restnode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  //showPanel: string = ''; //<= 'panelCliente' si la ruta es /Cliente/Panel
  // 'panelTienda' si la ruta es /Tienda
  // '' si la ruta es /Cliente/Login o /Cliente/Registro

  routerEvent$:Observable<RouterEvent>;
  patron: RegExp = new RegExp('/Cliente/(Login|Registro)|/Tienda/MostrarPedido');

  constructor(router: Router, private _rest: RestnodeService, private activatedRoute: ActivatedRoute) {
    /*
    router.events.subscribe((ev) => {
      if(ev instanceof NavigationStart){
        if(new RegExp('(/Cliente/(Login|Registro)|/Tienda/MostrarPedido)').test(ev.url)){
          this.showPanel='';
      }
      else{
        this.showPanel=new RegExp("/Cliente/Panel/*").test(ev.url)?'panelCliente':'panelTienda';
      }
    }
*/
  this.routerEvent$=router.events.pipe(
    map(ev=>ev as RouterEvent),
    filter((ev)=>ev instanceof NavigationStart )
  );
  }



}
