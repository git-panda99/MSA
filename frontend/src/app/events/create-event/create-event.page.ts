import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { EventVideoService } from 'src/app/shared/event-video.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  selectValue: string;
  typeValue: string;

  eventForm: FormGroup;
  fileToUpload: File = null;
  userId: any;
  imageURL: string;
  apiUrl: string;
  fileValid: boolean = false;

  constructor(
    private http: HttpClient,
    private eventVidoeAPI: EventVideoService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    this.apiUrl = environment.api_url;
    this.eventForm = this.fb.group({
      title: [''],
      posterUrl: "",
      description: [''],
      price: 0,
      beginDate: "2012-10-25T12:00:00.000Z",
      endDate: "2012-10-25T12:00:00.000Z",
      type: "",
      source: "",
      videoUrl: "",
      userId: 100,
    })
    this.userId = authService.getProfileId().then( (res) => {
      this.userId = res;
    });
  }

  ngOnInit() { }

  attachFile(e){
    if (e.target.files.length == 0) {
      console.log("No file selected!");
      return
    }

    if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      this.fileValid = false;
      this.fileToUpload = null;
      return;
    }
    this.fileValid = true;

    let file: File = e.target.files[0];
    this.fileToUpload = file;
  }

  modifyImage(f){
    if(this.imageURL == null) {
      this.uploadImage(f);
    }
    else {
      this.removeImage(f);
    }
  }

  removeImage(f){
    this.http.delete(environment.api_url + '/files/' + this.imageURL);
    console.log("Deleted image"+ this.imageURL);
    this.imageURL = null;

  }

  uploadImage(f){
    let formData = new FormData(); 
    formData.append('file', this.fileToUpload, this.fileToUpload.name); 
    this.http.post(environment.api_url+'/files/upload', formData).subscribe((res) => {

    console.log(res);
    this.imageURL = res['filename'];
    });
  }

  onSelectSource(option) {
    if (option.value=="") {
      return;
    }
    this.selectValue = option.target.value;
  }

  onSelectType(option) {
    if (option.value=="") {
      return;
    }
    this.typeValue = option.target.value;
  }

  onFormSubmit() {

    if (!this.eventForm.valid) {
      return false;
    } else {
      this.eventForm.value.posterUrl = this.imageURL;
      this.eventForm.value.source = this.selectValue;
      this.eventForm.value.type = this.typeValue;
      this.eventForm.value.userId = this.userId;
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

  clearData(f) {
    this.removeImage(f);

    this.router.navigate(['/tabs/my-events']);
  }

}
