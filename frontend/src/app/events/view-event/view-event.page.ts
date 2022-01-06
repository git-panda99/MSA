import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventVideo } from 'src/app/shared/event-video';
import { EventVideoService } from 'src/app/shared/event-video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.page.html',
  styleUrls: ['./view-event.page.scss'],
})
export class ViewEventPage implements OnInit {
  apiUrl: string;

  eventVideo: any;
  id: any;

  constructor(
    private eventVideoAPI: EventVideoService,
    private actRoute: ActivatedRoute,
  ) {
    this.apiUrl = environment.api_url;
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.eventVideoAPI.getEventVideo(this.id).subscribe(res => {
      this.eventVideo = res;
      console.log(res)
      /*this.eventVideo["posterUrl"] = res['posterUrl'];
      this.eventVideo["description"] = res['description'];
      this.eventVideo["price"] = res['price'];
      this.eventVideo["beginDate"] = res['beginDate'];
      this.eventVideo["endDate"] = res['endDate'];
      this.eventVideo["type"] = res['type'];
      this.eventVideo["source"] = res['source'];
      this.eventVideo["videoUrl"] = res['videoUrl'];*/
    });
  }

}
