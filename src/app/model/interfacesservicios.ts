import { ICliente } from "./cliente";
import { ILibro } from "./libro";
import { Observable } from "rxjs";
import { IPedido } from "./pedido";

export interface IStorageService {
    AlmacenarDatosCliente(datoscliente:ICliente):void;
    AlmacenarJWT(jwt:string):void;
    RecuperarDatosCliente():Observable<ICliente>; //<--- lo podiamos hacer devolviendo valor de tipo icliente como en blazor, pero con el observable aprovechamos pipe async
    RecuperarJWT():Observable<string>; //<--- lo podiamos hacer devolviendo valor de tipo string como en blazor, pero con el observable aprovechamos pipe async
    OperarItemsPedido(libro:ILibro, cantidad:number, operacion : string):void
    RecuperarItemsPedido():Observable<{libroElemento: ILibro, cantidadElemento:number}[]>;
    
}