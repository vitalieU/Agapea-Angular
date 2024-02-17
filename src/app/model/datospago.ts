import { IDireccion } from "./direccion";

export interface IDatosPago {

    //datos envio...
    tipodireccionenvio: string; //"principal" u "otra"
    direccionEnvio?: IDireccion;
    nombreEnvio?: string;
    apellidosEnvio?: string;
    telefonoEnvio?: string;
    emailEnvio?: string;
    otrosDatos?:string;

    //datos facturacion
    tipoDireccionFactura:string; // "igualenvio" u "otra"
    nombreFactura?:string;
    docfiscalFactura?:string;
    direccionFacturacion?: IDireccion;


    //datos pago
    metodoPago:string; // "paypal" o "tarjeta"
    numeroTarjeta?:string;
    nombreBanco?:string;
    mesCaducidad?:number;
    anioCaducidad?:number;
    cvv?:number;

}