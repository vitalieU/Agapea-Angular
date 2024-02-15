import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import RestnodeService from '../../../servicios/restnode.service';
import { IRestMessage } from '../../../model/mensaje';
import { STORAGE_SERVICE } from '../../../servicios/injecitontokenstorage';
import { IStorageService } from '../../../model/interfacesservicios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor( private router:Router, private service:RestnodeService, @Inject(STORAGE_SERVICE) private storgeSvc:IStorageService) {   }

  public credenciales:{email:string,password:string}={email:'',password:''};

  irARegistro(){
    this.router.navigateByUrl('/Cliente/Registro');
  }

  async LoginCliente(loginForm:NgForm):Promise<void>{
    console.log(loginForm);
    const respLogin = await this.service.LoginCliente(loginForm.value.email,loginForm.value.password);
    if(respLogin.codigo===0){
      this.storgeSvc.AlmacenarDatosCliente(respLogin.datosCliente!);
      this.router.navigateByUrl('/Tienda/Libros/2');
    }
    else{
      console.log(respLogin.mensaje);
    }
  }
}
