import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTicketsPage } from './mytickets.page';

const routes: Routes = [
  {
    path: '',
    component: MyTicketsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTicketsPageRoutingModule {}
