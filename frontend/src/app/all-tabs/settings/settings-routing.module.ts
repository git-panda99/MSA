import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfilePage } from 'src/app/user/edit-profile/edit-profile.page';
import { ProfilePage } from 'src/app/user/profile/profile.page';
import { SettingsPage } from './settings.page';

const routes: Routes = [
  {path: '', component: SettingsPage,},
  {path: 'profile', component: ProfilePage},
  {path: 'edit-profile', component: EditProfilePage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPageRoutingModule {}
