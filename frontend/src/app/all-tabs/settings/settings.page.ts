import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  userData: any;
  
  constructor(private authService: AuthService) {
  }

  ionViewWillEnter() {
    this.authService.user.subscribe((res) => {
      console.log("got user")
      console.log(res)
      this.userData = res;
    })
  }

  logout() {
    this.authService.logout();
  }

}
