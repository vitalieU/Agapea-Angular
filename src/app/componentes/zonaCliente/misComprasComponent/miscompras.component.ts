import {jsPDF} from 'jspdf';
import { Component, Inject } from '@angular/core';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { Observable, Subscription, switchAll, switchMap, tap } from 'rxjs';
import { IPedido } from '../../../modelos/pedido';
import { ICliente } from '../../../modelos/cliente';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { ILibro } from '../../../modelos/libro';

@Component({
  selector: 'app-miscompras',
  templateUrl: './miscompras.component.html',
  styleUrl: './miscompras.component.css'
})
export class MiscomprasComponent {
  public cliente!:ICliente
  public suscription:Subscription = new Subscription();
  public pedidos!:IPedido[];
  public meses: Array<[string, string]> = 
  [["1","Enero"],["2","Febrero"], ["3","Marzo"], ["4","Abril"], ["5","Mayo"], ["6","Junio"], ["7","Julio"], ["8","Agosto"], ["9","Septiembre"], ["10","Octubre"], ["11","Noviembre"], ["12","Diciembre"]] ;
  public anios: Array<number> = Array.from({ length: new Date(Date.now()).getFullYear() - 2009 }, (el, pos) => pos + 2010);
  public mesSeleccionado:number=0;
  public anioSeleccionado:number=0;
  

  constructor(@Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService) { 
    this.suscription=this.storageSvc.RecuperarDatosCliente()
                    .subscribe(
                      (data)=>{
                        if(data){
                          this.cliente=data;
                        }
                      }
                    );
      this.pedidos=this.cliente.pedidos!;                

  }


  VolverAComprar(event:Event){
    if (event.target) {
      const inputElement = event.target as HTMLInputElement;
      const [isbn13, idPedido] = inputElement.value.split('*_*');
      const Pedido:IPedido|undefined= this.pedidos.find(pedido=>pedido.idPedido===idPedido);
      //devolver el libro de pedido.elementosPedido[libro, cantidad]
      const libro:ILibro|undefined=Pedido?.elementosPedido.find(elemento=>elemento.libroElemento.ISBN13===isbn13)?.libroElemento;
      if(libro){
        this.storageSvc.OperarElementosPedido(libro, "agregar");
      }
      
    }
  }

  GenerarFactura(event:Event){
    if (event.target) {
      const inputElement = event.target as HTMLInputElement;
      const idPedido = inputElement.value;
      const Pedido:IPedido|undefined= this.pedidos.find(pedido=>pedido.idPedido===idPedido);
      const doc = new jsPDF();
      doc.text(`Factura del pedido ${idPedido}`, 10, 10);
      let y=20;
      Pedido?.elementosPedido.forEach(elemento=>{
        doc.text(`${elemento.libroElemento.Titulo} - ${elemento.cantidadElemento} - ${elemento.libroElemento.Precio}€`, 10, y);
        y+=10;
      });
      doc.text(`Total: ${Pedido?.totalPedido}€`, 10, y);
      doc.save(`FacturaPedido${idPedido}.pdf`);

      
    }


  }
  FiltrarPedidos():void{
    //formato fecha 2024-02-17T16:03:50.180Z
    let pedidoFiltrado:IPedido[];

    if(this.mesSeleccionado!==0 && this.anioSeleccionado!==0){
      pedidoFiltrado=this.cliente.pedidos!.filter(
        pedido=>
        {
          const [anio, mes, resto]=pedido.fechaPedido.toString().split('-');
          if(parseInt(anio)===this.anioSeleccionado && parseInt(mes)===this.mesSeleccionado){
            return true;
          }
          else{
            return false;
          }
        }
        );
    }
    else if(this.anioSeleccionado!==0){
      pedidoFiltrado=this.pedidos.filter(
        pedido=>
        {
          const fechaPedido:Date=new Date(pedido.fechaPedido);
          return fechaPedido.getFullYear()===this.anioSeleccionado;
        }
        );
    }
    else{
      pedidoFiltrado=this.cliente.pedidos!;
    }

    this.pedidos=pedidoFiltrado;
    
  }
  SeleccionarMes(event:Event){
    if (event.target) {
      const selectElement = event.target as HTMLSelectElement;
      this.mesSeleccionado=parseInt(selectElement.value);
    }
  }
  SeleccionarAnio(event:Event){
    if (event.target) {
      const selectElement = event.target as HTMLSelectElement;
      this.anioSeleccionado=parseInt(selectElement.value);
    }
  }
}
