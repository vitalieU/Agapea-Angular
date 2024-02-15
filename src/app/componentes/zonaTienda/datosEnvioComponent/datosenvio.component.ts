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

@Component({
  selector: 'app-datosenvio',
  templateUrl: './datosenvio.component.html',
  styleUrl: './datosenvio.component.css'
})
export class DatosenvioComponent implements OnDestroy {
    
  @Input()listaProvincias!:IProvincia[];
  @Output() checkdatosFacturacionEvent:EventEmitter<boolean>=new EventEmitter<boolean>();
  @ViewChild('selectmunis') selectmunis!:ElementRef;

  //public datosCliente$!:Observable<ICliente>;
  public datosCliente!:ICliente | null;
  public direccionprincipal:IDireccion | undefined;
  private datosClienteSubscriptor:Subscription;
  public listaMunicipios$!:Observable<IMunicipio[]>;

  //----variables de tipo switch para ocultar/mostrar partes de la vista datosenvio-----
  public checkdirppalenvio:boolean=true;
  public checkclienteloggedenvio:boolean=true;
  @Output() datosEnvioEvent:EventEmitter<IDireccion>= new EventEmitter<IDireccion>();
  public formDatosEnvio:FormGroup=new FormGroup({});

  constructor(@Inject(STORAGE_SERVICE) private storageSvc:IStorageService,
              private restSvc: RestnodeService,
              private render2: Renderer2){
    //this.datosCliente$=this.storageSvc.RecuperarDatosCliente();
    this.datosClienteSubscriptor=this.storageSvc
                                    .RecuperarDatosCliente()
                                    .subscribe( datos => { 
                                          this.datosCliente=datos;
                                          this.direccionprincipal=this.datosCliente?.direcciones?.filter((d:IDireccion)=>d.esPrincipal==true)[0]
                                        });
    this.formDatosEnvio= new FormGroup({
      'pais': new FormControl('España'),
      'provincia': new FormControl(''),
      'municipio': new FormControl(''),
      'direccion': new FormControl(''),
      'cp': new FormControl(''),
 

    });                                    
  }
  CargarMunicipios(provSelec: string) { //<--- va: "cpro - nombre provincia"
    this.listaMunicipios$ = this.restSvc.RecuperarMunicipios(provSelec.split('-')[0]);
    this.render2.removeAttribute(this.selectmunis.nativeElement, 'disabled');
  }

  ShowComponenteDatosFactura(ev:any){
    this.checkdatosFacturacionEvent.emit(ev.target.checked);
  }
  CheckdirPpalEnvio(check:boolean){
    this.checkdirppalenvio=check;
  }

  CheckClienteLoggedEnvio(check:boolean){
    this.checkclienteloggedenvio=check;
  }

  ngOnDestroy(): void {
    this.datosClienteSubscriptor.unsubscribe();
  }
  EnviarDatosEnvio(){
    this.datosEnvioEvent.emit(this.formDatosEnvio.value)
  }

}
