import { Component, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ILibro } from '../../../model/libro';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import RestnodeService from '../../../servicios/restnode.service';
import { STORAGE_SERVICE } from '../../../servicios/injecitontokenstorage';
import { IStorageService } from '../../../model/interfacesservicios';


@Component({
  selector: 'app-detalleslibro',
  templateUrl: './detalles-libro.component.html',
  styleUrl: './detalles-libro.component.css'
})
export class DetalleslibroComponent {
 
  private _obsLibro:Observable<ILibro> | undefined;
  private _subLibro: Subscription | undefined;
  public _libro!: ILibro;
  constructor(private activatedRoute: ActivatedRoute, private restSvc: RestnodeService,
    @Inject(STORAGE_SERVICE) private storageSvc: IStorageService, private router:Router) { 
    //Cogemos el parametro isbn13 de la ruta
    this.activatedRoute.paramMap.subscribe((params:ParamMap) => {
      let isbn13:string | null = params.get('isbn13');

      console.log('ISBN recuperado de la url: ',isbn13);
      if(isbn13 == null){
        isbn13 = '';
      }
      this._obsLibro = this.restSvc.RecuperarLibro(isbn13);
      this._subLibro = this._obsLibro.subscribe((libro:ILibro) => {
        this._libro = libro;
      });

    });
  }
  AddLibroPedido():void{
    console.log('Añadiendo libro al pedido');
    this.storageSvc.OperarItemsPedido(this._libro, 1, 'add');
    this.router.navigateByUrl('/Tienda/MostrarPedido');
  }
  ngOnDestroy(): void {
    //Desuscribirse del observable
    this._subLibro?.unsubscribe();
  }
}