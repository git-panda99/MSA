import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  User: Observable<any>;
  userData: User;
  
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
