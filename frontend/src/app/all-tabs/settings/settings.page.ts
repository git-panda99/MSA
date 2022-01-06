import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  userData: any;
  apiUrl: string;
  
  constructor(private authService: AuthService,
    private router: Router
    ) {
      this.apiUrl = environment.api_url;
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
