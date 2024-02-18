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

  public showPanel:string=''; //<----- 'panelCliente' si en url: /Cliente/Panel/...., 'panelTienda' si en url: /Tienda/..., '' si en url /Cliente/Login o Registro
  public patron:RegExp=new RegExp("(/Cliente/(Login|Registro)|/Tienda/MostrarPedido)","g");
  constructor(private router:Router, private _rest: RestnodeService, private activatedRoute: ActivatedRoute) {
    
    this.router
    .events
    .pipe(
          //tap( ev => console.log(ev) ),
          map( ev => ev as RouterEvent),
          filter( (ev,i)=> ev instanceof NavigationStart)
    )
    .subscribe(
      ev => {
        console.log('testeando url en layout...', ev.url);

        if( /\/Cliente\/Panel\/.*/.test(ev.url)){
            this.showPanel='panelCliente';
        } else if(/\/Tienda\/(?!MostrarPedido)|^\/?$/.test(ev.url)){
           this.showPanel='panelTienda';
        } else {
          this.showPanel='';
        }
        console.log('show panel valoe...', this.showPanel);
      }
    );

}


}
