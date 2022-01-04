import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateEventPage } from 'src/app/events/create-event/create-event.page';
import { UpdateEventPage } from 'src/app/events/update-event/update-event.page';
import { MyEventsPage } from './my-events.page';

const routes: Routes = [
  {path: '', component: MyEventsPage},
  {path: 'create-event', component: CreateEventPage},
  {path: 'update-event/:id', component: UpdateEventPage},
  /*{
    path: 'update-event/:id',
    loadChildren: () => import('../../events/update-event/update-event.module').then( m => m.UpdateEventPageModule)
  },*/
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), HttpClientModule
  ],
  exports: [RouterModule]
})
export class MyEventsPageRoutingModule {}
