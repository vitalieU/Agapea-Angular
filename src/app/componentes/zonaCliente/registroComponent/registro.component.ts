import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { compareToValidator } from '../../../validators/compareTo';
import RestnodeService from '../../../servicios/restnode.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  public miform:FormGroup;

  constructor(private router:Router) {
    this.miform=new FormGroup(
      {
        nombre: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]  ),
        apellidos: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(200) ]),
        email: new FormControl('', [ Validators.required, Validators.email ] ), //<---- validador asincrono para comprobar q no exista ya el email
        repemail: new FormControl('', [ Validators.required, Validators.email, compareToValidator('email') ]),
        password: new FormControl('',[ Validators.required, Validators.minLength(5), Validators.pattern('.*')] ),
        repassword: new FormControl('',[ Validators.required, Validators.minLength(5), Validators.pattern('.*'), compareToValidator('password') ]),
        login: new FormControl('',[ Validators.minLength(3),Validators.maxLength(25) ]),
        telefono: new FormControl()
      }
    );
    
  }

  http=inject(RestnodeService);

  registrarCliente(miform:FormGroup):void{
    
    this.http.RegistroCliente(miform.value).subscribe(
      (data)=>{
        console.log(data);
        if(data.codigo===0){
          this.router.navigateByUrl('/Cliente/RegistroOk');
        }
      },
      (error)=>{console.log(error);}
    );

  }

  

}
