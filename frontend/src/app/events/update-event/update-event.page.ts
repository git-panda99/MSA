import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { EventVideoService } from 'src/app/shared/event-video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.page.html',
  styleUrls: ['./update-event.page.scss'],
})
export class UpdateEventPage implements OnInit {
  typeValue: string;
  sourceValue: string;
  
  fileValid: boolean = false;
  imageURL: string;
  fileToUpload: File = null;
  beginDate: string;
  endDate: string;

  apiUrl: string;
  httpOptions: any;

  updateEventVideoForm: FormGroup;
  id: any;

  constructor(
    private http: HttpClient,
    private eventVideoAPI: EventVideoService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private authService: AuthService
  ) {
    this.authService.getCurrentAccessToken().then((res) => {
      this.httpOptions = { headers: new HttpHeaders({ 
        'Authorization': `Bearer ${res}`
      })}
    });

    this.apiUrl = environment.api_url;
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
      this.imageURL = res['posterUrl'];
      this.sourceValue = res['source'];
      this.typeValue = res['type'];
      this.beginDate = res['beginDate']
      this.endDate = res["endDate"];
    });
  }

  updateForm() {
    if (!this.updateEventVideoForm.valid) {
      return false;
    } else {
      this.updateEventVideoForm.value.posterUrl = this.imageURL;
      this.updateEventVideoForm.value.source = this.sourceValue;
      this.updateEventVideoForm.value.type = this.typeValue;

      this.updateEventVideoForm.value.beginDate = this.beginDate;
      this.updateEventVideoForm.value.endDate = this.endDate;

      this.eventVideoAPI.updateEventVideo(this.id, this.updateEventVideoForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateEventVideoForm.reset();
          this.router.navigate(['/tabs/my-events']);
        })
    }
  }


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
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
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
    this.sourceValue = option.target.value;
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

  deleteEventVideo() {
    if (window.confirm('Do you want to delete event '+ this.updateEventVideoForm.value.title +'?')) {
      this.eventVideoAPI.deleteEventVideo(this.id)
        .subscribe(() => {
          console.log('Event deleted!')
          this.router.navigate(['/tabs/my-events']);
        }
        )
    }
  }

}
