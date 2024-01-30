import { ICredenciales } from "./credenciales";
import { IDireccion } from "./direccion";

export interface ICliente {
    nombre: string,
    apellidos: string,
    cuenta: ICredenciales,
    telefono: string,
    direcciones: IDireccion[],
}