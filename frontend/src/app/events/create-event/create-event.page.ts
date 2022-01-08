import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ViewWillLeave } from '@ionic/angular';
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
  httpOptions: any;
  beginDate: string;
  endDate: string;

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
    this.authService.getCurrentAccessToken().then((res) => {
        this.httpOptions = { headers: new HttpHeaders({ 
          'Authorization': `Bearer ${res}`
        })}
      });
    this.apiUrl = environment.api_url;
    this.eventForm = this.fb.group({
      title: [''],
      posterUrl: "",
      description: [''],
      price: 0,
      beginDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: "",
      source: "",
      videoUrl: "",
      userId: 100,
    });
    this.userId = authService.getProfileId().then( (res) => {
      this.userId = res;
    });
    this.beginDate =new Date().toISOString();
    this.endDate =new Date().toISOString();
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
    this.http.delete(environment.api_url + '/files/' + this.imageURL, this.httpOptions).subscribe((res) => {
      console.log(res);
      });
    console.log("Deleted image"+ this.imageURL);
    this.imageURL = null;

  }

  uploadImage(f){
    let formData = new FormData(); 
    formData.append('file', this.fileToUpload, this.fileToUpload.name); 
    this.http.post(environment.api_url+'/files/upload', formData, this.httpOptions).subscribe((res) => {

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

  onSelectBeginDate(value) {
    if (value=="") {
      return;
    }
    console.log("BeginDate" + value.target.value);
    this.beginDate = value.target.value;
  }

  onSelectEndDate(value) {
    if (value=="") {
      return;
    }
    this.endDate = value.target.value;
  }

  onFormSubmit() {

    if (!this.eventForm.valid) {
      return false;
    } else {
      this.eventForm.value.posterUrl = this.imageURL;
      this.imageURL = null;
      this.eventForm.value.source = this.selectValue;
      this.eventForm.value.type = this.typeValue;
      this.eventForm.value.userId = this.userId;
      this.eventForm.value.beginDate = this.beginDate;
      this.eventForm.value.endDate = this.endDate;
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
    if(this.imageURL!=null)
      this.removeImage(f);

    this.router.navigate(['/tabs/my-events']);
  }

  ionViewWillLeave() {
    this.clearData(null)
  }

}
