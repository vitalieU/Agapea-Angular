import { Component, Inject } from '@angular/core';
import { Observable, map, switchMap, concatMap, mergeMap } from 'rxjs';
import { ICliente } from '../../../model/cliente';
import { ILibro } from '../../../model/libro';
import { STORAGE_SERVICE } from '../../../servicios/injecitontokenstorage';
import { IStorageService } from '../../../model/interfacesservicios';
import { KeyValue } from '@angular/common';
import { IProvincia } from '../../../model/provincia';
import RestnodeService from '../../../servicios/restnode.service';
import { IPedido } from '../../../model/pedido';
import { IDatosPago } from '../../../model/datospago';
import { IRestMessage } from '../../../model/mensaje';


@Component({
  selector: 'app-pedido-component',
  templateUrl: './pedido-component.component.html',
  styleUrl: './pedido-component.component.css'
})
export class MostrarpedidoComponent {
  public listaItems$!:Observable<Array<{libroElemento:ILibro, cantidadElemento:number}>>;
  
  public subTotal$!:Observable<number>;
  public gastosEnvio:number=2; //dependera de provincia de direccion envio q esta en objeto datosPago y bla bla bla...

  public listaProvincias$!:Observable<IProvincia[]>;
  public showcompdatosfacturacion:boolean=false;
  public datosPago:IDatosPago={  tipodireccionenvio:'principal', tipoDireccionFactura: 'igualenvio', metodoPago:'tarjeta' };

   constructor( @Inject(STORAGE_SERVICE) private storageSvc:IStorageService,
                private restSvc:RestnodeService ){
      this.listaItems$=storageSvc.RecuperarItemsPedido() as Observable<Array<{libroElemento:ILibro, cantidadElemento:number}>>;
      this.subTotal$=this.listaItems$.pipe(
                                          map(
                                            (items:{ libroElemento:ILibro, cantidadElemento:number}[])=> items.reduce( (suma,item)=> suma + (item.libroElemento.Precio * item.cantidadElemento) ,0)
                                          )
                                          );
      this.listaProvincias$=restSvc.RecuperarProvincias();
   }

   ShowCompDatosFacturacion(valor:boolean){
    this.showcompdatosfacturacion=valor;
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
   }

   FinalizarPedido(){
      console.log('finalzando...');

      let _pedidoActual:IPedido={
          idPedido: window.crypto.randomUUID(),
          fechaPedido: new Date(Date.now()),
          estadoPedido: 'pendiente de pago',
          elementosPedido: [] ,
          subTotalPedido: 0,
          gastosEnvio: this.gastosEnvio,
          totalPedido: 0 + this.gastosEnvio,
          datosPago: this.datosPago
        };

        this.listaItems$.pipe(
                                mergeMap(
                                  (items:Array<{libroElemento:ILibro, cantidadElemento:number}>) => {
                                            _pedidoActual.elementosPedido=items;

                                            let _subtotal=items.reduce( (s,i)=>s + (i.libroElemento.Precio * i.cantidadElemento), 0);
                                            _pedidoActual.subTotalPedido=_subtotal;
                                            _pedidoActual.totalPedido=_subtotal + _pedidoActual.gastosEnvio;
                                            
                                            return this.storageSvc.RecuperarDatosCliente() as Observable<ICliente>;
                                          }
                                )
                          ).subscribe(
                            async clientelog => {
                                        console.log('datos a mandar a server...',{ pedido: _pedidoActual, email: clientelog!.cuenta.email});
                                        const resp:IRestMessage|undefined=await this.restSvc.FinalizarPedido( _pedidoActual, clientelog!.cuenta.email);
                                        if(resp?.codigo===0){
                                          console.log('pedido finalizado con exito');
                                          window.location.assign(resp.otrosdatos!);
                                        }

                            }
                          )
        }

}