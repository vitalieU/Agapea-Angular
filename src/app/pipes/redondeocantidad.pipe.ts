import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'redondeocantidad'
})
export class RedondeocantidadPipe implements PipeTransform {

  transform(value:number, numeroDecimal:number=2): number {
   return Number(value.toFixed(numeroDecimal));
   

  }

}
