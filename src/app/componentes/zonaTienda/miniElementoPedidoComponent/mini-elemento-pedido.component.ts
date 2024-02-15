import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ILibro } from '../../../model/libro';
import { STORAGE_SERVICE } from '../../../servicios/injecitontokenstorage';
import { IStorageService } from '../../../model/interfacesservicios';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-elementopedido',
  templateUrl: './mini-elemento-pedido.component.html',
  styleUrl: './mini-elemento-pedido.component.css',
})
export class ElementopedidoComponent {
  @Input() public elemento!:{libroElemento:ILibro, cantidadElemento:number};
  @Output() public operarItemEvent:EventEmitter< [ {libroElemento:ILibro, cantidadElemento:number}, string ] >=new EventEmitter< [ {libroElemento:ILibro, cantidadElemento:number}, string ] >();

  public OperarElemento(operacion:string){
    this.operarItemEvent.emit( [ this.elemento, operacion ] );
  }
}
