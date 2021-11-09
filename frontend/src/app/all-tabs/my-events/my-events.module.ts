import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyEventsPage } from './my-events.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { MyEventsPageRoutingModule } from './my-events-routing.module';
import { EventsModule } from 'src/app/events/events.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    EventsModule,
    RouterModule.forChild([{ path: '', component: MyEventsPage }]),
    MyEventsPageRoutingModule,    
  ],
  declarations: [MyEventsPage]
})
export class MyEventsPageModule {}
