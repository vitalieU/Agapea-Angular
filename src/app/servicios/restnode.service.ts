import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from '../model/cliente';
import { IRestMessage } from '../model/mensaje';
import { Observable, lastValueFrom } from 'rxjs';
import { ICategoria } from '../model/categoria';
import { ILibro } from '../model/libro';

@Injectable({
  providedIn: 'root'
})



export default class RestnodeService {
  //servicio para poder hacer pet.rest a serv.RESFTULL de nodejs....
  constructor(private _httpclient:HttpClient) { }

  public LoginCliente(email:string, password:string):Promise<IRestMessage>{
    //¿¿como cojones hago para mandar objeto "credenciales" q me pasa el componente login.component.ts
    //a nodejs usando el servicio HttpClient de angular??
        return lastValueFrom(
                    this._httpclient.post<IRestMessage>(
                              'http://localhost:3003/api/Cliente/Login',
                              {email,password},
                              { 
                                headers: new HttpHeaders({'Content-Type': 'application/json'})
                              }
                              )
        );

  }
  public RegistroCliente(cliente : ICliente):Observable<IRestMessage>{
    return this._httpclient.post("http://localhost:3003/api/Cliente/Registro", cliente) as Observable<IRestMessage>;
  }

  public ComprobarEmail(email:string):Observable<IRestMessage>{
    return this._httpclient.get(`http://localhost:3003/api/Cliente/ComprobarEmail?email=${email}`) as Observable<IRestMessage>;
  }

  public ActivarCuenta(mode:string|null, oobCode:string|null, apiKey:string|null):Observable<IRestMessage>{
      return this._httpclient.get('http://localhost:3003/api/Cliente/ActivarEmail?mode='+  mode+'&oobCode='+oobCode+'&apiKey='+apiKey) as Observable<IRestMessage>;
  }

  public  RecuperarLibros(idcat:string):Observable<ILibro[]>{
    if(!! idcat){
      idcat= '2-10';
    }
    return this._httpclient.get<ILibro[]>('http://localhost:3003/api/Tienda/RecuperarLibros'+idcat);

  }
  public  RecuperarLibro(isbn:string):Observable<ILibro>{
    return this._httpclient.get<ILibro>('http://localhost:3003/api/Tienda/RecuperarLibro?isbn='+isbn);
  }
  public  RecuperarCategorias(idcat:String):Observable<ICategoria[]>{
    if(!! idcat) idcat="path";
    return  this._httpclient.get<ICategoria[]>('http://localhost:3003/api/Tienda/RecuperarCategorias?idcat='+idcat);
  }
}

