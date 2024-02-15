import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDireccion } from '../../../model/direccion';

@Component({
  selector: 'app-minidireccion',
  templateUrl: './minidireccion.component.html',
  styleUrl: './minidireccion.component.css'
})
export class MinidireccionComponent {
  @Input() direccion!:IDireccion;
  @Output() operarDirecEvent:EventEmitter<[IDireccion,string]>=new EventEmitter<[IDireccion,string]>();
  

}
