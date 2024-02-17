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

/*
{
  apellidos: "Ungureanu",
  pedidos: [
  ],
  direcciones: [
  ],
  telefono: "665010582",
  nombre: "Vitalie",
  cuenta: {
    login: "vital",
    ImagenBASE64: "",
    email: "vitalieungureanu200@gmail.com",
  },
}
*/