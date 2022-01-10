import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userData: any;
  apiUrl: string;
  
  updateUserForm: FormGroup;
  id: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.apiUrl = environment.api_url;
    this.authService.getProfileId().then(
      (res) => {
        this.id = res;
      }
    )
   }

   ngOnInit() {
    this.getProfileData();
    this.updateUserForm = this.fb.group({
      description: "",
      email: "",
      firstName: "",
      lastName: "",
    })
  }

  getProfileData() {
    this.authService.user.subscribe(res => {
      this.userData = res;
      this.updateUserForm.setValue({
        description: res.user.description,
        email: res.user.email,
        firstName: res.user.firstName,
        lastName: res.user.lastName,
      });
      console.log("User Form")
      console.log(this.updateUserForm.value)
    });
  }

  updateForm(){
    if (!this.updateUserForm.valid) {
      return false;
    } else {
      console.log(this.updateUserForm.value);
      this.userService.updateUser(this.id, this.updateUserForm.value)
        .subscribe((res) => {
          console.log(res)
          this.router.navigate(['../profile']);
        })
    }
  }

  deleteProfile(){
    this.userService.deleteUser(this.id);
    this.authService.logout();
  }

}
