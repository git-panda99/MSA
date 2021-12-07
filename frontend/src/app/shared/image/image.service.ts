import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  fileToUpload: File = null;
  userId = null;
  imageURL;

  constructor(private http: HttpClient, private storage: Storage) { }

  attachFile(e){
    if (e.target.files.length == 0) {
      console.log("No file selected!");
      return
    }
    let file: File = e.target.files[0];
    this.fileToUpload = file;
  }

  uploadImage(f){
    let formData = new FormData(); 
    formData.append('file', this.fileToUpload, this.fileToUpload.name); 
    this.http.post(environment.api_url+'/files/upload', formData).subscribe((res) => {

    console.log(res);
    this.imageURL = res['imageURL'];
    });
    return false;    
  }
  
}
