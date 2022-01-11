import { Component } from '@angular/core';
import { EventVideoService } from 'src/app/shared/event-video.service';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  EventVideos: any = [];
  Users: any = [];
  apiUrl: string;

  constructor(
    private eventVideoService: EventVideoService,
    private userService: UserService
  ) {
    this.apiUrl = environment.api_url;
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.eventVideoService.getEventVideoList().subscribe((res) => {
      console.log("got event list")
      console.log(res)
      this.EventVideos = res;
    })
    this.userService.getUserList().subscribe((res) => {
      console.log("got user list")
      console.log(res)
      this.Users = res;
    })
  }
}
