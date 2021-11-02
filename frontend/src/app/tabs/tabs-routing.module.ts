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
        loadChildren: () => import('../alltabs/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../alltabs/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'mytickets',
        loadChildren: () => import('../alltabs/mytickets/mytickets.module').then(m => m.MyTicketsPageModule)
      },
      {
        path: 'myevents',
        loadChildren: () => import('../alltabs/myevents/myevents.module').then(m => m.MyEventsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../alltabs/settings/settings.module').then(m => m.SettingsPageModule)
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
