import { Component } from '@angular/core';
//importamos lo necesario para la logica de inicio de sesion
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../servicio/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements ViewWillEnter, ViewDidLeave {
  public formulario: FormGroup;
  public cargando_bloqueo: boolean = false;
  private subCargando: Subscription | undefined;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { 
    this.formulario = fb.group({
      usuario: ['', [Validators.required]],
      contrasenia: ['', [Validators.required]]
    })
  }

  public validarFormulario(){
    const esValido = this.formulario.valid;
    if(!esValido){
      return
    }
    const datos = this.formulario.getRawValue();
    const usuario = datos['usuario'];
    const contrasenia = datos['contrasenia'];
    this.auth.iniciarSesion(usuario, contrasenia);
  }



  public ionViewWillEnter(): void {
    this.subCargando = this.auth.cargando.subscribe(nuevoValor => {
      this.cargando_bloqueo = nuevoValor;
    })
  }

  public ionViewDidLeave(): void {
    if(this.subCargando){
      this.subCargando.unsubscribe();
    }
  } 

}
