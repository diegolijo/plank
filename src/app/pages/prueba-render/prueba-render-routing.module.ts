import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebaRenderPage } from './prueba-render.page';

const routes: Routes = [
  {
    path: '',
    component: PruebaRenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebaRenderPageRoutingModule {}
