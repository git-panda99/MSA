import { Component } from '@angular/core';
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
  userTickets: any = null;
  apiUrl;

  constructor(
    private ticketService: TicketService,
    private authService: AuthService
  ) {
    this.apiUrl = environment.api_url;
  }

  ngOnInit()
  { 
    
  }

  ionViewWillEnter() {
    this.userId = this.authService.profile_id;
    if(this.userId!=null){
      this.ticketService.getTicketListByUserId(this.userId).subscribe((res) => {
        console.log("got event list")
        console.log(res)
        this.userTickets = res;
      })
    }
    
  }

}
