import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../all-tabs/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../all-tabs/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'my-tickets',
        loadChildren: () => import('../all-tabs/my-tickets/my-tickets.module').then(m => m.MyTicketsPageModule)
      },
      {
        path: 'my-events',
        loadChildren: () => import('../all-tabs/my-events/my-events.module').then(m => m.MyEventsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../all-tabs/settings/settings.module').then(m => m.SettingsPageModule)
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
