import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { TicketService } from 'src/app/shared/ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mytickets',
  templateUrl: 'my-tickets.page.html',
  styleUrls: ['my-tickets.page.scss']
})
export class MyTicketsPage {
  userId;
  userTickets: any = [];
  apiUrl;
  private myAuthService;

  constructor(
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router
  ) {
    this.myAuthService = authService;
    this.apiUrl = environment.api_url;
  }

  ngOnInit()
  { 
    
  }

  ionViewWillEnter() {
    if(this.myAuthService.profile_id==null){
      this.router.navigate(['/tabs/home']);
    } else {
      this.ticketService.getTicketListByUserId(this.myAuthService.profile_id).subscribe((res) => {
        console.log("got event list")
        console.log(res)
        this.userTickets = res;
      })
    }    
  }

}
