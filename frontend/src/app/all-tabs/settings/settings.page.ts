import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

}
