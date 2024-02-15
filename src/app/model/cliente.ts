import { ICredenciales } from "./credenciales";
import { IDireccion } from "./direccion";
import { IPedido } from "./pedido";

export interface ICliente {
    nombre:      string;
    apellidos:   string;
    cuenta:      {  email: string, login?:string, cuentaActiva?:boolean, imagenAvatarBASE64?:string };
    telefono:    string;
    direcciones?: IDireccion[];
    pedidos?:     IPedido[];
    genero?:     string;
    fechaNacimiento?:    Date;
    descripcion?:   string;
}