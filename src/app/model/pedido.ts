import { IDatosPago } from "./datospago";
import { IDireccion } from "./direccion";
import { ILibro } from "./libro";

export interface IPedido {
    idPedido:             string;
    fechaPedido:          Date;
    estadoPedido:         string;
    elementosPedido:      Array< { libroElemento:    ILibro, cantidadElemento: number } >;
    subTotalPedido:       number;
    gastosEnvio:          number;
    totalPedido:          number;
    datosPago:            IDatosPago;
}