import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth.service';
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
  private myAuthService;

  constructor(
    private eventVideoService: EventVideoService,
    private authService: AuthService,
    private router: Router
  ) {
    this.myAuthService = authService;
    this.apiUrl = environment.api_url;
  }

  ngOnInit() { }

  ionViewWillEnter() {
    if(this.myAuthService.profile_id==null){
      this.router.navigate(['/tabs/home']);
    } else {
      this.eventVideoService.getEventVideoListById(this.myAuthService.profile_id).subscribe((res) => {
      console.log("got event list")
      console.log(res)
      this.EventVideos = res;
    })
    }
  }

  deleteEventVideo(eventVideo, i) {
    if (window.confirm('Do you want to delete event '+ eventVideo.title +'?')) {
      this.eventVideoService.deleteEventVideo(eventVideo.id)
        .subscribe(() => {
          this.EventVideos.splice(i, 1);
          console.log('Event deleted!')
        }
        )
    }
  }

}
