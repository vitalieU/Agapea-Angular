import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import RestnodeService from '../../../servicios/restnode.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IRestMessage } from '../../../model/mensaje';
import { Subscribable, Subscription, concatMap } from 'rxjs';

@Component({
  selector: 'app-registrook',
  templateUrl: './registrook.component.html',
  styleUrl: './registrook.component.css'
})
export class RegistrookComponent implements OnInit, OnDestroy{
  private paramsSuscriptor!:Subscription;
  restService=inject(RestnodeService);

  constructor(  
               private router: Router, 
               private activatedRouter:ActivatedRoute) { }
  ngOnDestroy(): void {
    this.paramsSuscriptor.unsubscribe();
  }

  
  ngOnInit(): void {
    /*
    let mdoe:string|null=this.activatedRouter.snapshot.queryParamMap.get('mode');
    let oobCode:string|null=this.activatedRouter.snapshot.queryParamMap.get('oobCode');
    let apiKey:string|null=this.activatedRouter.snapshot.queryParamMap.get('apiKey');
    let resp:IRestMessage= this.restService.ActivarEmail(mdoe, oobCode, apiKey);
    */

    /*this.activatedRouter.queryParamMap.subscribe( 
      (parametros:ParamMap)=>{
        let mdoe:string|null=parametros.get('mode');
        let oobCode:string|null=parametros.get('oobCode');
        let apiKey:string|null=parametros.get('apiKey');
        

        this.restService.ActivarEmail(mdoe, oobCode, apiKey).subscribe(
          (resp:IRestMessage)=>{
           if(resp.codigo===0){
            this.router.navigateByUrl('/Cliente/Login');
           }
           else{
            return 
           }
          }
        );

      }
    );*/

    //same code as above but with concatmap

    this.paramsSuscriptor=this.activatedRouter.queryParamMap.pipe(
      concatMap( (parametros: ParamMap)=>{
        let mdoe: string|null=parametros.get('mode');
        let oobCode: string|null=parametros.get('oobCode');
        let apiKey: string|null=parametros.get('apiKey');
        if(mdoe===null || oobCode===null || apiKey===null){
          throw new Error("Error en los parametros de la url");
        }
        return this.restService.ActivarCuenta(mdoe, oobCode, apiKey);
      } )
    ).subscribe(
      (resp:IRestMessage)=>{
       if(resp.codigo===0){
        this.router.navigateByUrl('/Cliente/Login');
       }
       else{
        
       }
      }
    );
  }



}
