import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { IDireccion } from '../../../model/direccion';
import { IProvincia } from '../../../model/provincia';
import { IMunicipio } from '../../../model/municipio';
import RestnodeService from '../../../servicios/restnode.service';

@Component({
  selector: 'app-modaldirecciones',
  templateUrl: './modaldirecciones.component.html',
  styleUrl: './modaldirecciones.component.css'
})
export class ModaldireccionesComponent {
  @Input()direccionEd:IDireccion |undefined;

  public formdirecciones: FormGroup;
  public operacion:string='crear';
  public listaprovincias$!:Observable<Array<IProvincia>>;
  public listamunicipios$!:Observable<Array<IMunicipio>>;
  @ViewChild('btonCerrar') btonCerrar!:ElementRef;
  @ViewChild('selectmunis') selectmunis!:ElementRef;

  constructor(private restSvc:RestnodeService, private renderer2: Renderer2)  {
    this.listaprovincias$=restSvc.RecuperarProvincias();

    this.formdirecciones = new FormGroup(
                                      {
                                        calle:new FormControl('',[Validators.required]),
                                        cp: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{5}$')]),
                                        pais: new FormControl( 'España'),
                                        provincia: new FormControl(),
                                        municipio: new FormControl()
                                      }
      ); //cierre formgroup direcciones
    } 

   public  CargarMunicipios( provSelec:string){ //<--- va: "cpro - nombre provincia"
      //this.selectmunis.nativeElement.innerHTML='';
      this.listamunicipios$=this.restSvc.RecuperarMunicipios(provSelec.split('-')[0]);
      this.renderer2.removeAttribute(this.selectmunis.nativeElement, 'disabled');

    }
    public ResetValoresModal(){
      //restituimos formmodal a valores iniciales
      this.direccionEd=undefined;
      this.operacion='crear';    
    }    

    public  PrecargaDatosFormConDireccionModif(){

      this.formdirecciones.controls['calle'].setValue(this.direccionEd!.calle);
      this.formdirecciones.controls['cp'].setValue(this.direccionEd!.cp);
      this.formdirecciones.controls['pais'].setValue(this.direccionEd!.pais);
      this.formdirecciones.controls['provincia'].setValue(this.direccionEd!.provincia.CPRO + '-' + this.direccionEd!.provincia.PRO);
      this.CargarMunicipios(this.direccionEd!.provincia.CPRO);
  
      //dejo un poco de tiempo para q se carguen los municipios...
      setTimeout( 
        ()=> this.formdirecciones.controls['municipio'].setValue(this.direccionEd!.municipio.CMUM + '-' + this.direccionEd!.municipio.DMUN50),
        1000
      );   
    }


    public OperarDireccion(){

      //tras alta o modificacion, ocultamos modal..
      this.HideModal();
    }

    public HideModal(){
      this.btonCerrar.nativeElement.click();
    }
}
