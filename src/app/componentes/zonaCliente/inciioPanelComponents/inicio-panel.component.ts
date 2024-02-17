import {
  Component,
  ElementRef,
  Inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ICliente } from '../../../model/cliente';
import { IDireccion } from '../../../model/direccion';
import { ModaldireccionesComponent } from '../modalDireccionesComponent/modaldirecciones.component';
import RestnodeService from '../../../servicios/restnode.service';
import { STORAGE_SERVICE } from '../../../servicios/injecitontokenstorage';
import { IStorageService } from '../../../model/interfacesservicios';

@Component({
  selector: 'app-inicio-panel',
  templateUrl: './inicio-panel.component.html',
  styleUrl: './inicio-panel.component.css',
})
export class InicioPanelComponent {
  public formdatos: FormGroup;
  public dias: Array<number> = Array.from({ length: 31 }, (el, pos) => pos + 1);
  public meses: Array<string> = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  public anios: Array<number> = Array.from(
    { length: new Date(Date.now()).getFullYear() - 1933 },
    (el, pos) => pos + 1934
  );

  public imgSrc: string = '';
  private _fichImagen!: File;

  public datosClienteStorage$: Observable<ICliente | null>;
  public direcciones$: Observable<IDireccion[]>;
  public direcEditar: IDireccion = {
    idDireccion: window.crypto.randomUUID(),
    calle: '',
    cp: 0,
    pais: 'España',
    provincia: {
      CCOM: '',
      CPRO: '',
      PRO: '',
    },
    municipio: {
      CUN: '',
      DMUN50: '',
      CPRO: '',
      CMUM: '',
    },
    esPrincipal: false,
    esFacturacion: false,
  };

  @ViewChild('btnUploadImagen') btnUploadImagen!: ElementRef;
  @ViewChild('modaldirec') modaldirec!: ModaldireccionesComponent;
  @ViewChild('btonNewDireccion') btonNewDireccion!: ElementRef;

  constructor(
    private renderer2: Renderer2,
    private restSvc: RestnodeService,
    @Inject(STORAGE_SERVICE) private storageSvc: IStorageService
  ) {
    this.datosClienteStorage$ =
      this.storageSvc.RecuperarDatosCliente() as Observable<ICliente | null>;
    this.direcciones$ = this.datosClienteStorage$.pipe(
      map((cliente: ICliente | null) => {
        if (cliente && cliente.direcciones && cliente.direcciones.length > 0) {
          return cliente.direcciones;
        } else {
          return [];
        }
      })
    ) as Observable<IDireccion[]>;

    this.formdatos = new FormGroup({
      email: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{3}\\s?([0-9]{2}\\s?){3}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'
        ),
      ]),
      repassword: new FormControl(''), // crear validador personalizado sincrono para comprobar si coincide con password
      genero: new FormControl(''),
      login: new FormControl('', [Validators.required]),
      dia: new FormControl('0'),
      mes: new FormControl('0 '),
      anio: new FormControl('0'),
      descripcion: new FormControl('', [Validators.maxLength(500)]),
    }); //cierre formgroup formulario datos personales....

    //inicializamos el formulario con el ultimo valor del observable de datos del cliente...
    this.datosClienteStorage$.subscribe((datoscliente: ICliente | null) => {
      if (datoscliente) {
        this.imgSrc = datoscliente.cuenta.imagenAvatarBASE64 || '';

        this.formdatos.controls['email'].setValue(datoscliente.cuenta.email);
        this.formdatos.controls['nombre'].setValue(datoscliente.nombre);
        this.formdatos.controls['apellidos'].setValue(datoscliente.apellidos);
        this.formdatos.controls['telefono'].setValue(datoscliente.telefono);
        this.formdatos.controls['genero'].setValue(datoscliente.genero);
        this.formdatos.controls['login'].setValue(datoscliente.cuenta.login);
        this.formdatos.controls['descripcion'].setValue(
          datoscliente.descripcion
        );

        if (datoscliente.fechaNacimiento) {
          this.formdatos.controls['dia'].setValue(
            new Date(datoscliente.fechaNacimiento).getDay()
          );
          this.formdatos.controls['mes'].setValue(
            new Date(datoscliente.fechaNacimiento).getMonth()
          );
          this.formdatos.controls['anio'].setValue(
            new Date(datoscliente.fechaNacimiento).getFullYear()
          );
        }
      }
    }); //cierre subscripcion observable cliente
  }

  public async UpdateDatosCliente() {
    console.log(this.formdatos);
  }

  public PrevisualizarImagen(inputimagen: any) {
    this._fichImagen = inputimagen.files[0] as File;
    let _lector: FileReader = new FileReader();

    _lector.addEventListener('load', (ev) => {
      console.log(ev.target!.result);

      this.imgSrc = ev.target!.result as string;
      this.renderer2.removeAttribute(
        this.btnUploadImagen.nativeElement,
        'disabled'
      );
    });

    _lector.readAsDataURL(this._fichImagen);
  }

  public UploadImagen() {}

  public OperarDirecciones(datos: [IDireccion, string]) {
    switch (datos[1]) {
      case 'pendientemodificar':
        //muestro modal con direccion a modificar...
        console.log('vamos a modificar direccion...', datos[0]);

        this.modaldirec.operacion = 'modificar';
        this.modaldirec.direccionEd = datos[0];
        this.modaldirec.PrecargaDatosFormConDireccionModif();

        //this.modaldirec.ShowModal();
        this.btonNewDireccion.nativeElement.click();

        break;

      default:
        break;
    }
  }
}
