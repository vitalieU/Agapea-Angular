import { Component, Inject, Input } from '@angular/core';
import { ILibro } from '../../../model/libro';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { IStorageService } from '../../../model/interfacesservicios';
import { STORAGE_SERVICE } from '../../../servicios/injecitontokenstorage';

@Component({
  selector: 'app-mini-libro',
  templateUrl: './mini-libro.component.html',
  styleUrl: './mini-libro.component.css'
})
export class MiniLibroComponent {

  @Input() libro!:ILibro

  constructor(@Inject(STORAGE_SERVICE) private storageService: IStorageService, 
              private router: Router) {
       }

  AddLibroPedido(){
    this.storageService.OperarItemsPedido(this.libro,1,'add');
    this.router.navigateByUrl('/Tienda/MostrarPedido');
  }
}
