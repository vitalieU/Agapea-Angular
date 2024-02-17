import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, Renderer2, ViewChild } from '@angular/core';
import { ICategoria } from '../../../model/categoria';
import { ICliente } from '../../../model/cliente';
import { Observable, Subscription } from 'rxjs';
import { STORAGE_SERVICE } from '../../../servicios/injecitontokenstorage';
import { IStorageService } from '../../../model/interfacesservicios';
import { IDireccion } from '../../../model/direccion';
import { IProvincia } from '../../../model/provincia';
import { IMunicipio } from '../../../model/municipio';
import RestnodeService from '../../../servicios/restnode.service';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { IDatosPago } from '../../../model/datospago';

@Component({
  selector: 'app-datosenvio',
  templateUrl: './datosenvio.component.html',
  styleUrl: './datosenvio.component.css'
})
export class DatosenvioComponent implements OnDestroy {
    
  @Input()listaProvincias!:IProvincia[];
  @Input()datosPago!:IDatosPago;
  @Output() checkdatosFacturacionEvent:EventEmitter<boolean>=new EventEmitter<boolean>();
  
  //----------referencias a variables template de la vista ---------------------
  @ViewChild('selectmunis') selectmunis!:ElementRef;
 

  //public datosCliente$!:Observable<ICliente>;
  public datosCliente!:ICliente | null;
  public direccionprincipal:IDireccion | undefined;
  public listaMunicipios$!:Observable<IMunicipio[]>;

  private datosClienteSubscriptor:Subscription;
  private _dirEnvioIni:IDireccion={
                                    idDireccion:  window.crypto.randomUUID(),
                                    calle:        '',
                                    pais:         'España',
                                    cp:           0,
                                    provincia:    { CCOM:'', PRO:'', CPRO:''},
                                    municipio:    { CUN:'', CPRO:'', CMUM:'', DMUN50:''},
                                    esPrincipal:  true,
                                    esFacturacion: false,
                              };
  //----variables de tipo switch para ocultar/mostrar partes de la vista datosenvio-----
  public checkdirppalenvio:boolean=true;
  public checkclienteloggedenvio:boolean=true;
  

  constructor(@Inject(STORAGE_SERVICE) private storageSvc:IStorageService,
              private restSvc: RestnodeService,
              private render2: Renderer2){
    //this.datosCliente$=this.storageSvc.RecuperarDatosCliente();
    this.datosClienteSubscriptor=(this.storageSvc
                                    .RecuperarDatosCliente() as Observable<ICliente | null>)
                                    .subscribe( (datos:ICliente|null) => { 
                                          
                                          this.datosCliente=datos;

                                          if (this.datosCliente?.direcciones && this.datosCliente.direcciones.length > 0) {
                                            this.direccionprincipal=this.datosCliente.direcciones.filter((d:IDireccion)=>d.esPrincipal==true)[0];                                              
                                          } else {
                                              // lo mismo el cliente esta registrado y aun no tiene direcciones dadas de alta...entonces obligo a q genere una:
                                              this.checkdirppalenvio=false;
                                          }
                                  
                                        });
  }

  ngOnChanges(){
    if(!this.checkdirppalenvio){
        this.datosPago.direccionEnvio=this._dirEnvioIni;
    }
  }

  CargarMunicipios( provSelec:string){ //<--- va: "cpro - nombre provincia"
    //this.selectmunis.nativeElement.innerHTML='';
    this.listaMunicipios$=this.restSvc.RecuperarMunicipios(provSelec.split('-')[0]);
    this.render2.removeAttribute(this.selectmunis.nativeElement, 'disabled');
    

    this.datosPago.direccionEnvio!.provincia={CCOM:'', CPRO: provSelec.split('-')[0], PRO: provSelec.split('-')[1] }
  }

  EstableceMunicipio( muniSelec: string){
    this.datosPago.direccionEnvio!.municipio={CUN:'', CPRO: this.datosPago.direccionEnvio!.provincia.CPRO, CMUM:muniSelec.split('-')[0] , DMUN50: muniSelec.split('-')[1] }
  }

  ShowComponenteDatosFactura(ev:any){
    this.checkdatosFacturacionEvent.emit(ev.target.checked);
  }
  CheckdirPpalEnvio(check:boolean){
    this.checkdirppalenvio=check;
    if (check) {
        this.datosPago.tipodireccionenvio='principal';
        this.datosPago.direccionEnvio=this.direccionprincipal;  
    } else {
        this.datosPago.tipodireccionenvio='otradireccion';
        this.datosPago.direccionEnvio=this._dirEnvioIni;

    }
  }

  CheckClienteLoggedEnvio(check:boolean){
    this.checkclienteloggedenvio=check;
  }

  ngOnDestroy(): void {
    this.datosClienteSubscriptor.unsubscribe();
  }

}
