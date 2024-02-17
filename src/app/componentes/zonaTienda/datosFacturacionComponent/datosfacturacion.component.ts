import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { IProvincia } from '../../../model/provincia';
import { Observable } from 'rxjs';
import { IMunicipio } from '../../../model/municipio';
import  RestnodeService  from '../../../servicios/restnode.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDireccion } from '../../../model/direccion';
import { IDatosPago } from '../../../model/datospago';

@Component({
  selector: 'app-datosfacturacion',
  templateUrl: './datosfacturacion.component.html',
  styleUrl: './datosfacturacion.component.css'
})
export class DatosfacturacionComponent {
  @Input()listaProvincias!:IProvincia[];
  @Input()datosPago!:IDatosPago;

  @ViewChild('selectmunisfact') selectmunisfact!:ElementRef;
  
  public checkempresa:boolean=true;
  public checkmismadirecfactura:boolean=true;
  public listaMunicipios$!:Observable<IMunicipio[]>;

  constructor(private restSvc:RestnodeService, private render2:Renderer2){ }

  ngOnChanges(){
    if(this.checkmismadirecfactura) this.datosPago.direccionFacturacion=this.datosPago.direccionEnvio;
  }

  CheckEmpresaChange(valor:boolean){
    this.checkempresa=valor;
  }

  ChangeDirecFacturacion(){
    this.checkmismadirecfactura = ! this.checkmismadirecfactura;

    if(this.checkmismadirecfactura) {
      this.datosPago.direccionFacturacion=this.datosPago.direccionEnvio;
    } else {
      this.datosPago.direccionFacturacion={
                                            idDireccion:  window.crypto.randomUUID(),
                                            calle:        '',
                                            pais:         'España',
                                            cp:           0,
                                            provincia:    { CCOM:'', PRO:'', CPRO:''},
                                            municipio:    { CUN:'', CPRO:'', CMUM:'', DMUN50:''},
                                            esPrincipal:  true,
                                            esFacturacion: false,
                                      };
    }

  }
  CargarMunicipios( provSelec:string){ //<--- va: "cpro - nombre provincia"
      this.listaMunicipios$=this.restSvc.RecuperarMunicipios(provSelec.split('-')[0]);
      this.render2.removeAttribute(this.selectmunisfact.nativeElement, 'disabled');

      this.datosPago.direccionFacturacion!.provincia={CCOM:'', CPRO: provSelec.split('-')[0], PRO: provSelec.split('-')[1] };
  }

  EstableceMunicipio( muniSelec: string){
    this.datosPago.direccionFacturacion!.municipio={CUN:'', CPRO: this.datosPago.direccionFacturacion!.provincia.CPRO, CMUM:muniSelec.split('-')[0] , DMUN50: muniSelec.split('-')[1] };
  }


}
