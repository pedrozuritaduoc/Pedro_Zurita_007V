import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//no usamos  FormsModule 
//import { FormsModule } from '@angular/forms';
//en lugar de eso importamos ReactiveFormsModule
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioSesionPageRoutingModule } from './inicio-sesion-routing.module';

import { InicioSesionPage } from './inicio-sesion.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    InicioSesionPageRoutingModule
  ],
  declarations: [InicioSesionPage]
})
export class InicioSesionPageModule {}
