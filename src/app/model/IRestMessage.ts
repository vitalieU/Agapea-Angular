import { ICliente } from "./ICliente";

export  interface IRestMessage {
    codigo:number;
    mensaje:string;
    error?:string;
    token?:string;
    datosCliente?:ICliente;
}