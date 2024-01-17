import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from '../model/ICliente';
import { IRestMessage } from '../model/IRestMessage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestnodeService {
  //servicio para poder hacer pet.rest a serv.RESFTULL de nodejs....
  constructor(private petAjax:HttpClient) {

   }

   registrarCliente(Cliente : ICliente):Observable<IRestMessage>{
    return this.petAjax.post<IRestMessage>('http://localhost:3000/api/clientes',
                                            Cliente, 
                                            {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  loginCliente(email:string,password:string):Observable<IRestMessage>{
    return this.petAjax.post<IRestMessage>('http://localhost:3000/api/clientes/login',
                                            {email:email,password:password}, 
                                            {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }


}
