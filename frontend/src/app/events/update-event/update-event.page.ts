import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EventVideoService } from 'src/app/shared/event-video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.page.html',
  styleUrls: ['./update-event.page.scss'],
})
export class UpdateEventPage implements OnInit {
  typeValue: string;
  selectValue: string;
  
  fileValid: boolean = false;
  imageURL: string;
  fileToUpload: File = null;

  apiUrl: string;

  updateEventVideoForm: FormGroup;
  id: any;

  constructor(
    private http: HttpClient,
    private eventVideoAPI: EventVideoService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
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
    });
  }

  updateForm() {
    if (!this.updateEventVideoForm.valid) {
      return false;
    } else {
      this.updateEventVideoForm.value.posterUrl = this.imageURL;
      this.updateEventVideoForm.value.source = this.selectValue;
      this.updateEventVideoForm.value.type = this.typeValue;

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
    this.http.delete(environment.api_url + '/files/' + this.imageURL);
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
