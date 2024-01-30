import { Component, Input } from '@angular/core';
import { ILibro } from '../../../model/libro';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mini-libro',
  templateUrl: './mini-libro.component.html',
  styleUrl: './mini-libro.component.css'
})
export class MiniLibroComponent {

  @Input() libro!:ILibro

  constructor() { }

  AddLibroPedido(){
    
  }
}
