import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmPageRoutingModule } from './confirm-routing.module';

import { ConfirmPage } from './confirm.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPageRoutingModule,
    ExploreContainerComponentModule,
    HttpClientModule
  ],
  declarations: [ConfirmPage]
})
export class ConfirmPageModule {}
