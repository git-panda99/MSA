import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class AuthModule { }
