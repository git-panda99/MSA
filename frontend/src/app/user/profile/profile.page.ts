import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';  


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;
  apiUrl: string; 
  updateUserForm: FormGroup;
  id: any;
  profileImageUrl: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.apiUrl = environment.api_url;
  }

  ngOnInit() {
    this.getProfileData();
    this.updateUserForm = this.fb.group({
      username: [""],
      password: [""],
      email: [""],
      role: 0,
      imageUrl: [""]
    })
  }

  getProfileData() {
    this.authService.getProfileData().subscribe(res => {
      this.userData = res;
      this.profileImageUrl = this.apiUrl+'/files/'+ this.userData?.user?.imageUrl;
      this.updateUserForm.setValue({
        username: this.userData.user.username,
        password: [""],
        email: this.userData.user.email,
        role: this.userData.user.role,
        imageUrl: this.userData.user.imageUrl
      });
    });
  }

  updateForm() {
    if (!this.updateUserForm.valid) {
      return false;
    } else {
      this.userService.updateUser(this.id, this.updateUserForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateUserForm.reset();
          this.router.navigate(['/tabs/settings']);
        })
    }
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

}
