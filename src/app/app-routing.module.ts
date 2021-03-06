import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'pinball',
    loadChildren: () => import('./pages/pinball/pinball.module').then(m => m.PinballPageModule)
  },
  {
    path: 'prueba-render',
    loadChildren: () => import('./pages/prueba-render/prueba-render.module').then( m => m.PruebaRenderPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
