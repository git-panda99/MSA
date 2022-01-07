import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEventPage } from './view-event.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEventPage
  },
  {
    path: 'fullscreen',
    loadChildren: () => import('../fullscreen/fullscreen.module').then( m => m.FullscreenPageModule)
  },
  {
    path: 'embedded',
    loadChildren: () => import('../embedded/embedded.module').then( m => m.EmbeddedPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEventPageRoutingModule {}
