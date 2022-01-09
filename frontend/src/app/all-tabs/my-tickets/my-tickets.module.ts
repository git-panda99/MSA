import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyTicketsPage } from './my-tickets.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { MyTicketsPageRoutingModule } from './my-tickets-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MyTicketsPageRoutingModule,
  ],
  declarations: [MyTicketsPage]
})
export class MyTicketsPageModule {}
