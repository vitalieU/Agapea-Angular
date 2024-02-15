import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, last, map, of } from 'rxjs';
import { STORAGE_SERVICE } from '../servicios/injecitontokenstorage';
import { IStorageService } from '../model/interfacesservicios';

@Injectable({
  providedIn: 'root'
})

export class AccespPedidoGuard implements CanActivate {
  private _obsAcceso: Observable<boolean | UrlTree> = of(true);

    constructor(@Inject(STORAGE_SERVICE) private storageSrv:IStorageService, private router:Router) { }





    canActivate(
      childRoute: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this._obsAcceso= this.storageSrv
          .RecuperarDatosCliente()
          .pipe(
            map((datos) => {
              if(datos != null){
                 //Le damos el valor true al observable
                  return true;
              }else {
                //Le damos el valor false al observable
                 return this.router.createUrlTree(['/Cliente/Login']);
              }
            }),
            
          );
          return this._obsAcceso;
      }



 


}
