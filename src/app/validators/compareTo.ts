//validador sincrono para comparar el valor de dos campos, si coinicide no devuelvo error, sino coincide
//devuelvo error
import {  AbstractControl, ValidatorFn } from "@angular/forms";

export function compareToValidator( idControlAComparar:string): ValidatorFn {

        return (control:AbstractControl): { [key:string]: boolean } | null => {
            //tengo q recuperar el valor del campo del formulario (FormControl) con nombre: nombreControlAComparar

            const valorControl: string=control.value;
            const valorAcomparar:string=control.parent?.get(idControlAComparar)?.value;
            if(valorAcomparar===valorControl){
                    //si validacion esta ok...
                    return null;
            } else {
                //validacion erronea, con coinciden valores....
                return { 'compareTo': true };
            }
        }
}