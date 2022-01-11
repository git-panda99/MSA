import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchPage } from './watch.page';

const routes: Routes = [
  {
    path: '',
    component: WatchPage
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
export class WatchPageRoutingModule {}
