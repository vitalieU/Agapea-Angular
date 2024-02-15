import { Injectable, signal } from '@angular/core';
import { IStorageService } from '../model/interfacesservicios';
import { Observable } from 'rxjs';
import { ICliente } from '../model/cliente';
import { ILibro } from '../model/libro';

@Injectable({
  providedIn: 'root'
})
export class SignalstorageService implements IStorageService{

  private clienteSingnal=signal<ICliente|null>(null);

  constructor() { }
  AlmacenarDatosCliente(datoscliente: ICliente): void {
    this.clienteSingnal.update(this.clienteSingnal);
  }
  AlmacenarJWT(jwt: string): void {
    throw new Error('Method not implemented.');
  }
  RecuperarDatosCliente(): Observable<ICliente> {
    throw new Error('Method not implemented.');
  }
  RecuperarJWT(): Observable<string> {
    throw new Error('Method not implemented.');
  }
  OperarItemsPedido(libro: ILibro, cantidad: number, operacion: string): void {
    throw new Error('Method not implemented.');
  }
  RecuperarItemsPedido(): Observable<{ libroElemento: ILibro; cantidadElemento: number; }[]> {
    throw new Error('Method not implemented.');
  }
}
