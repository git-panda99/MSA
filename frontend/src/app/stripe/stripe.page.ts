import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../shared/ticket.service';
declare var Stripe;

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage {
  stripe: any;
  card: any;
  eventId;
  eventPrice;
  eventTitle;
  userId;
  zone: any;


  constructor(
      private http: HttpClient, 
      private actRoute: ActivatedRoute,
      private ticketService: TicketService,
      private router: Router, 
    ) {
    this.stripe = Stripe(environment.stripe_key);
    this.eventId = this.actRoute.snapshot.paramMap.get('eventid');
    this.eventPrice = this.actRoute.snapshot.paramMap.get('eventprice');
    this.eventTitle = this.actRoute.snapshot.paramMap.get('eventtitle');
    this.userId = this.actRoute.snapshot.paramMap.get('userid');
  }

  ngOnInit() {
     this.setupStripe();
  }

  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });
    console.log(this.card);
    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      console.log(event)

      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
          this.makePayment(result.source);
        }
      });
    });
  }


  makePayment(token) {
    let par = {
      amount: (+this.eventPrice)*100,
      currency: "ron",
      token: token.id
      }
    console.log("Par");
    console.log(par);
    this.http
    .post(environment.api_url + "/pay", par)
    .subscribe(data => {
    console.log("Pay Response")
    console.log(data);
    });
    this.buyEvent()
    }

    buyEvent(){
      this.ticketService.addTicketBuy({id:0, userId: this.userId, eventId: this.eventId, valid: true, liked: true, purchaseDate: new Date()})
          .subscribe((res) => {
            console.log(res)
              this.router.navigate(['/tabs/event/'+this.eventId]);
          });
    }

}
