import { Component, Inject } from '@angular/core';
import RestnodeService from '../../../servicios/restnode.service';
import { IStorageService } from '../../../model/interfacesservicios';
import { STORAGE_SERVICE } from '../../../servicios/injecitontokenstorage';
import { IRestMessage } from '../../../model/mensaje';
import { ICliente } from '../../../model/cliente';

@Component({
  selector: 'app-finalizar-pedido-ok',
  templateUrl: './finalizar-pedido-ok.component.html',
  styleUrl: './finalizar-pedido-ok.component.css'
})
export class FinalizarPedidoOkComponent {


  constructor(private restService:RestnodeService,  @Inject(STORAGE_SERVICE) private storageSvc:IStorageService) { }

   ngOnInit(): void {

    const jwt: string = window.sessionStorage.getItem('jwt') as string;
    this.restService.RecuperarCliente(jwt).subscribe(
      (data: IRestMessage) => {
        if (data.codigo == 200) {
          this.storageSvc.AlmacenarDatosCliente(data.datosCliente as ICliente);
        }
      }
    );
  }

  ngOnDestroy(): void {
    //unsubscribe
    
  }
}
