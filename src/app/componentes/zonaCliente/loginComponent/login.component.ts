import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestnodeService } from '../../../servicios/restnode.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor( private router:Router, private service:RestnodeService) {   }

  public credenciales:{email:string,password:string}={email:'',password:''};

  irARegistro(){
    this.router.navigateByUrl('/Cliente/Registro');
  }

  LoginCliente(loginForm:NgForm){
    console.log(loginForm);
    this.service.loginCliente(loginForm.value.email,loginForm.value.password);
  }
}
