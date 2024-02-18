import { Component, Inject } from '@angular/core';
import { ICliente } from '../../../model/cliente';
import { Observable, Subscription } from 'rxjs';
import { STORAGE_SERVICE } from '../../../servicios/injecitontokenstorage';
import { IStorageService } from '../../../model/interfacesservicios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panelcliente',
  templateUrl: './panelcliente.component.html',
  styleUrl: './panelcliente.component.css',
})
export class PanelclienteComponent {
  public cliente!: ICliente;
  public listaOpciones: string[] = [
    'Inicio Panel',
    'Mis Compras',
    'Mis Opiniones',
    'Mis Listas',
  ];
  private subscriptorCliente: Subscription;
  public cliente$: Observable<ICliente | null> =
    new Observable<ICliente | null>();
    

  constructor(
    @Inject(STORAGE_SERVICE) private storageSvc: IStorageService,
    private router: Router
  ) {
    this.subscriptorCliente = (
      this.storageSvc.RecuperarDatosCliente() as Observable<ICliente>
    ).subscribe((datos: ICliente | null) => {
      if (datos) {
        this.cliente = datos;
      } else {
        this.router.navigateByUrl('/Cliente/Login');
      }
      console.log('el cliente ', datos);
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscriptorCliente.unsubscribe();
  }
}
