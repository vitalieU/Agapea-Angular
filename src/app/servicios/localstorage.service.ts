import { Injectable } from '@angular/core';
import { IStorageService } from '../model/interfacesservicios';
import { ICliente } from '../model/cliente';
import { Observable, of } from 'rxjs';
import { ILibro } from '../model/libro';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService implements IStorageService{

  constructor() { }
  OperarItemsPedido(libro: ILibro, cantidad: number, operacion: string): void {
    throw new Error('Method not implemented.');
  }
  RecuperarItemsPedido(): Observable<{ libroElemento: ILibro; cantidadElemento: number; }[]> {
    throw new Error('Method not implemented.');
  }
  AlmacenarDatosCliente(datoscliente: ICliente): void {
    localStorage.setItem('datoscliente', JSON.stringify(datoscliente))
  }
  AlmacenarJWT(jwt: string): void {
    localStorage.setItem('datoscliente', jwt)
  }
  RecuperarDatosCliente(): Observable<ICliente> {
    let _datoscliente:ICliente = (JSON.parse(localStorage.getItem('datoscliente')! ))as ICliente;
    return of(_datoscliente); //el operador of ...
  }
  RecuperarJWT(): Observable<string> {
    return of(JSON.parse(localStorage.getItem('jwt')!));
  }
  
}
