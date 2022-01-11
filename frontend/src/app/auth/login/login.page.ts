import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}
 
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',  [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
 
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    
    this.authService.login(this.credentials.value).subscribe(
      async _ => {        
        await loading.dismiss();        
        this.router.navigateByUrl('/tabs/settings', { replaceUrl: true });
      },
      async (res) => {        
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
 
  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();
 
    this.authService.signUp(this.credentials.value).subscribe(
      async _ => {
        await loading.dismiss();        
        this.login();
      },
      async (res) => {
        await loading.dismiss();        
        const alert = await this.alertController.create({
          header: 'Signup failed',
          message: res.error.msg,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  get email() {
    return this.credentials.get('email');
  }
  
  get password() {
    return this.credentials.get('password');
  }

}
