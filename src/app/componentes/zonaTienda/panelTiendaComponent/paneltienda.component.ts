import { Component } from '@angular/core';
import RestnodeService from '../../../servicios/restnode.service';
import { Observable } from 'rxjs';
import { ICategoria } from '../../../model/categoria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paneltienda',
  templateUrl: './paneltienda.component.html',
  styleUrl: './paneltienda.component.css'
})
export class PaneltiendaComponent {

  public categorias$:Observable<ICategoria[]>;
  constructor(private restService:RestnodeService, private router:Router) {
    this.categorias$=this.restService.RecuperarCategorias('raices');
   }
   public GotoCategoria(ev:Event,cat:ICategoria)
   {
     this.router.navigateByUrl(`/Tienda/Libros/${cat.IdCategoria}`);
   }
}
