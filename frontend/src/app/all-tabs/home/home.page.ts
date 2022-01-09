import { Component } from '@angular/core';
import { EventVideoService } from 'src/app/shared/event-video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  EventVideos: any = [];
  apiUrl: string;

  constructor(
    private eventVideoService: EventVideoService
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
  }
}
