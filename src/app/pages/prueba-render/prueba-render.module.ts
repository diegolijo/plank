import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebaRenderPageRoutingModule } from './prueba-render-routing.module';

import { PruebaRenderPage } from './prueba-render.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebaRenderPageRoutingModule
  ],
  declarations: [PruebaRenderPage]
})
export class PruebaRenderPageModule {}
