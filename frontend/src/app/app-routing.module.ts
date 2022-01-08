import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'view-event',
    loadChildren: () => import('./events/view-event/view-event.module').then( m => m.ViewEventPageModule)
  },  {
    path: 'fullscreen',
    loadChildren: () => import('./events/fullscreen/fullscreen.module').then( m => m.FullscreenPageModule)
  },
  {
    path: 'embedded',
    loadChildren: () => import('./events/embedded/embedded.module').then( m => m.EmbeddedPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
