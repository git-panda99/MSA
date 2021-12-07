import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventVideoService } from 'src/app/shared/event-video.service';
import { ImageService } from 'src/app/shared/image/image.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  eventForm: FormGroup;
  fileToUpload: File = null;
  userId = null;
  imageURL;

  constructor(
    private eventVidoeAPI: EventVideoService,
    private imageService: ImageService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone,
  ) {
    this.eventForm = this.fb.group({
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

  ngOnInit() { }

  attachFile(e){
    this.imageService.attachFile(e);
  }

  uploadImage(f){
    this.imageService.uploadImage(f);
  }

  onFormSubmit() {
    if (!this.eventForm.valid) {
      return false;
    } else {
      this.eventVidoeAPI.addEventVideo(this.eventForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.eventForm.reset();
            this.router.navigate(['/tabs/my-events']);
          })
        });
    }
  }

}
