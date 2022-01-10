import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  apiUrl: string;
  token: string;
  message: string;


  constructor(
    private actRoute: ActivatedRoute,
    public modalCtrl: ModalController,
    private httpClient: HttpClient
    ) {
    this.apiUrl = environment.api_url;
    this.token = this.actRoute.snapshot.paramMap.get('token');    
  }

  ngOnInit() {
    console.log("I work");
    this.httpClient.get(environment.api_url+'/confirm/'+this.token)
    .subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

}
