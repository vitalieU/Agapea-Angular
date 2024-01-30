import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import RestnodeService from '../../../servicios/restnode.service';
import { ILibro } from '../../../model/libro';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-libros-component',
  templateUrl: './libros-component.component.html',
  styleUrl: './libros-component.component.css',
})
export class LibrosComponentComponent {
 
  public idcat: string = '';
  public libros$!: Observable<ILibro[]>;

  constructor(
    private _rest: RestnodeService,
    private activatedRoute: ActivatedRoute
  ) {
    
    this.libros$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        
        this.idcat = params.get('idcat') as string;
        return this._rest.RecuperarLibros(this.idcat);
      })
    );    
  }
}
