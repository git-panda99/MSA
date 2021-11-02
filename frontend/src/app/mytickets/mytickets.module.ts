import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyTicketsPage } from './mytickets.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MyTicketsPageRoutingModule } from './mytickets-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: MyTicketsPage }]),
    MyTicketsPageRoutingModule,
  ],
  declarations: [MyTicketsPage]
})
export class MyTicketsPageModule {}
