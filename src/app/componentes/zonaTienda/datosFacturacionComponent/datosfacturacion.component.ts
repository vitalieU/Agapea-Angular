import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { IProvincia } from '../../../model/provincia';
import { Observable } from 'rxjs';
import { IMunicipio } from '../../../model/municipio';
import  RestnodeService  from '../../../servicios/restnode.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDireccion } from '../../../model/direccion';

@Component({
  selector: 'app-datosfacturacion',
  templateUrl: './datosfacturacion.component.html',
  styleUrl: './datosfacturacion.component.css'
})
export class DatosfacturacionComponent {
  @Input()listaProvincias!:IProvincia[];
  @ViewChild('selectmunis') selectmunis!:ElementRef;
  @Output() datosFacturacionEvent:EventEmitter<IDireccion>=new EventEmitter<IDireccion>();
  
  public checkempresa:boolean=true;
  public checkmismadirecfactura:boolean=true;
  public listaMunicipios$!:Observable<IMunicipio[]>;
  public miform:FormGroup=new FormGroup({});
  constructor(private restSvc:RestnodeService, private render2:Renderer2){ 

    this.miform=new FormGroup(
      {
        cif: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(9) ]  ),
        nombre: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]  ),
        direccion: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(200) ]),
        cp: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(5) ]),
        provincia: new FormControl('', [ Validators.required ]),
        municipio: new FormControl('', [ Validators.required ]),
        telefono: new FormControl('', [ Validators.required, Validators.minLength(9), Validators.maxLength(9) ]),
        email: new FormControl('', [ Validators.required, Validators.email ] )
      }
    );
  }

  CheckEmpresaChange(valor:boolean){
    this.checkempresa=valor;
  }

  CargarMunicipios( provSelec:string){
      this.listaMunicipios$=this.restSvc.RecuperarMunicipios(provSelec.split('-')[0]);
      this.render2.removeAttribute(this.selectmunis.nativeElement, 'disabled');
  }
 
}
