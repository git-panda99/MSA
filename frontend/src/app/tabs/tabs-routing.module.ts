import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../all-tabs/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../all-tabs/search/search.module').then(m => m.SearchPageModule),
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'my-tickets',
        loadChildren: () => import('../all-tabs/my-tickets/my-tickets.module').then(m => m.MyTicketsPageModule),
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'my-events',
        loadChildren: () => import('../all-tabs/my-events/my-events.module').then(m => m.MyEventsPageModule),
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'settings',
        loadChildren: () => import('../all-tabs/settings/settings.module').then(m => m.SettingsPageModule),
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
