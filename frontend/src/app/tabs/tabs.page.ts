import { Component } from '@angular/core';
import { AuthService } from '../auth/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  myAuthService: AuthService;
  constructor(authService: AuthService) {
    this.myAuthService = authService;
  }

}
