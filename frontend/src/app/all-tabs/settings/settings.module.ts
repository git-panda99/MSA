import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsPage } from './settings.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { ProfilePage } from 'src/app/user/profile/profile.page';
import { ProfilePageModule } from 'src/app/user/profile/profile.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: SettingsPage }]),
    SettingsPageRoutingModule,
    ProfilePageModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
