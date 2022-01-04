import { Component } from '@angular/core';
import { EventVideoService } from 'src/app/shared/event-video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-myevents',
  templateUrl: 'my-events.page.html',
  styleUrls: ['my-events.page.scss']
})
export class MyEventsPage {
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

  deleteEventVideo(eventVideo, i) {
    if (window.confirm('Do you want to delete user?')) {
      this.eventVideoService.deleteEventVideo(eventVideo.id)
        .subscribe(() => {
          this.EventVideos.splice(i, 1);
          console.log('Event deleted!')
        }
        )
    }
  }

}
