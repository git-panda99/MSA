import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateEventPage } from 'src/app/events/create-event/create-event.page';
import { UpdateEventPage } from 'src/app/events/update-event/update-event.page';
import { MyEventsPage } from './my-events.page';

const routes: Routes = [
  {path: '', component: MyEventsPage},
  {path: 'create-event', component: CreateEventPage},
  {path: 'update-event', component: UpdateEventPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyEventsPageRoutingModule {}
