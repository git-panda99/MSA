import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEventPage } from 'src/app/events/view-event/view-event.page';
import { MyTicketsPage } from './my-tickets.page';

const routes: Routes = [
  {path: '', component: MyTicketsPage,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTicketsPageRoutingModule {}
