import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, concatMap, map, take } from 'rxjs';
import { IStorageService } from '../model/interfacesservicios';
import { STORAGE_SERVICE } from '../servicios/injecitontokenstorage';

@Injectable()
export class AuthjwtInterceptor implements HttpInterceptor {
  constructor(@Inject(STORAGE_SERVICE) private storageSvc: IStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.storageSvc.RecuperarJWT().pipe(
      take(1),
      concatMap((jwt) => {
        if (jwt != null || jwt != '') {
          let _reqclonada = request.clone({
            setHeaders: { Authorization: `Bearer ${jwt}` },
          });
          return next.handle(_reqclonada);
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
