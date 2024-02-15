import { Component, Inject } from '@angular/core';
import { Observable, map, switchMap, concatMap } from 'rxjs';
import { ICliente } from '../../../model/cliente';
import { ILibro } from '../../../model/libro';
import { STORAGE_SERVICE } from '../../../servicios/injecitontokenstorage';
import { IStorageService } from '../../../model/interfacesservicios';
import { KeyValue } from '@angular/common';
import { IProvincia } from '../../../model/provincia';
import RestnodeService from '../../../servicios/restnode.service';
import { IPedido } from '../../../model/pedido';


@Component({
  selector: 'app-pedido-component',
  templateUrl: './pedido-component.component.html',
  styleUrl: './pedido-component.component.css'
})
export class MostrarpedidoComponent {
  public clientelogged$: Observable<ICliente>;
  public listaItemsPedido$: Observable<{ libroElemento: ILibro; cantidadElemento: number }[]>;
  public TotalPedido$: Observable<number>=new Observable<number>();
  public showcompdatosfacturacion:boolean=false;
  public listaProvincias$!:Observable<IProvincia[]>;

  constructor(
    @Inject(STORAGE_SERVICE) private storageSvc: IStorageService, private restSvc: RestnodeService
  ) {
    this.listaItemsPedido$ = storageSvc.RecuperarItemsPedido();
    this.clientelogged$ = storageSvc.RecuperarDatosCliente();
    this.TotalPedido$=this.listaItemsPedido$.pipe(
        map( items => items.reduce((acc, item) => acc + item.libroElemento.Precio * item.cantidadElemento, 0))
      );
    this.listaProvincias$=restSvc.RecuperarProvincias();
    
  }

  ModficarItemPedido( item: [ {libroElemento: ILibro, cantidadElemento:number}, string ]){
    
    let _libro:ILibro=item[0].libroElemento;
    let _cantidad: number=item[0].cantidadElemento;

    switch (item[1]) {
      case 'sumar': _cantidad +=1; break;
      case 'restar': _cantidad -=1; break;
      case 'borrar': _cantidad=0;  break;
    }
    this.storageSvc.OperarItemsPedido(_libro,_cantidad, item[1] != 'borrar' ? 'modificar' : 'borrar');
    this.TotalPedido$=this.listaItemsPedido$.pipe(
      map( items => items.reduce((acc, item) => acc + item.libroElemento.Precio * item.cantidadElemento, 0))
    );
   }

   ShowCompDatosFacturacion(valor:boolean){
    this.showcompdatosfacturacion=valor;
   }
   DatosEnvio($event:any){
    console.log('datos envio:  ', $event);
   }

   FinalizarPedido(){

   }

}