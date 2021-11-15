import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventVideoService } from 'src/app/shared/event-video.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.page.html',
  styleUrls: ['./update-event.page.scss'],
})
export class UpdateEventPage implements OnInit {

  updateEventVideoForm: FormGroup;
  id: any;

  constructor(
    private eventVideoAPI: EventVideoService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getEventVideoData(this.id);
    this.updateEventVideoForm = this.fb.group({
      title: [''],
      posterUrl: "",
      description: [''],
      price: 0,
      beginDate: "2012-10-25T12:00:00.000Z",
      endDate: "2012-10-25T12:00:00.000Z",
      type: "",
      source: "",
      videoUrl: ""
    })
  }

  getEventVideoData(id) {
    this.eventVideoAPI.getEventVideo(id).subscribe(res => {
      this.updateEventVideoForm.setValue({
        title: res['title'],
        posterUrl: res['posterUrl'],
        description: res['description'],
        price: res['price'],
        beginDate: res['beginDate'],
        endDate: res['endDate'],
        type: res['type'],
        source: res['source'],
        videoUrl: res['videoUrl']
      });
    });
  }

  updateForm() {
    if (!this.updateEventVideoForm.valid) {
      return false;
    } else {
      this.eventVideoAPI.updateEventVideo(this.id, this.updateEventVideoForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateEventVideoForm.reset();
          this.router.navigate(['/tabs/my-events']);
        })
    }
  }

}
