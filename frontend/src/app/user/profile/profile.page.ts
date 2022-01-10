import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;
  apiUrl: string;
  httpOptions: any;

  fileValid: boolean = false;
  imageURL: string;
  fileToUpload: File = null;
  
  updateUserForm: FormGroup;
  id: any;
  profileImageUrl: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.apiUrl = environment.api_url;
    this.authService.getCurrentAccessToken().then((res) => {
      this.httpOptions = { headers: new HttpHeaders({ 
        Authorization: `Bearer ${res}`
      })}
    });
    this.authService.getProfileId().then(
      (res) => {
        this.id = res;
      }
    )
  }

  ngOnInit() {
    this.getProfileData();
    this.updateUserForm = this.fb.group({
      imageUrl: ""
    })
  }

  getProfileData() {
    this.authService.user.subscribe(res => {
      this.userData = res;
      this.profileImageUrl = this.apiUrl+'/files/'+ this.userData?.user?.imageUrl;
      this.updateUserForm.setValue({
        imageUrl: this.userData.user.imageUrl
      });
      this.imageURL = this.userData.user.imageUrl;
      console.log("imageUrl"+this.imageURL);
    });
  }


  deleteUser() {
    if (window.confirm('Do you want to delete event '+ this.userData.user.username +'?')) {
      this.userService.deleteUser(this.userData.user.id)
        .subscribe(() => {
          this.authService.logout();
        }
        )
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
    if(this.imageURL == '') {
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
    this.imageURL = '';
    this.updateProfileImage('')

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
      this.updateProfileImage(res['filename'])
    })
  }

  updateProfileImage(img){
    if (!this.updateUserForm.valid) {
      return false;
    } else {
      this.updateUserForm.value.imageUrl = img;
      console.log("User for immage"+this.updateUserForm.value);
      console.log(this.updateUserForm.value);


      this.userService.updateUser(this.id, this.updateUserForm.value)
        .subscribe((res) => {
          console.log(res)
          this.router.navigate(['/tabs/settings/profile']);
        })
    }
  }

}
