import { Component, OnInit } from '@angular/core';
import { EventVideoService } from 'src/app/shared/event-video.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss'],
})
export class ListEventsComponent implements OnInit {
  Events: any = [];

  constructor(
    private eventVideoService: EventVideoService
  ) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.eventVideoService.getEventVideoList().subscribe((res) => {
      console.log(res)
      this.Events = res;
    })
  }

  deleteEventVideo(eventVideo, i) {
    if (window.confirm('Do you want to delete user?')) {
      this.eventVideoService.deleteEventVideo(eventVideo._id)
        .subscribe(() => {
          this.Events.splice(i, 1);
          console.log('Event deleted!')
        }
        )
    }
  }

}
