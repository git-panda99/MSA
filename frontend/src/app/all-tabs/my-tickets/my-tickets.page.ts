import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { TicketService } from 'src/app/shared/ticket.service';

@Component({
  selector: 'app-mytickets',
  templateUrl: 'my-tickets.page.html',
  styleUrls: ['my-tickets.page.scss']
})
export class MyTicketsPage {
  userId;
  userTickets: any = [];

  constructor(
    private ticketService: TicketService,
    private authService: AuthService
  ) {

  }

  ngOnInit()
  { 
    
  }

  ionViewWillEnter() {
    this.authService.getProfileId().then((res) => {
      this.userId = res;
      this.ticketService.getTicketListByUserId(res).subscribe((res2) => {
      console.log("got event list")
      console.log(res2)
      this.userTickets = res2;
    })
    });
    
  }

}
