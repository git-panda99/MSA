import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { EventVideo } from 'src/app/shared/event-video';
import { EventVideoService } from 'src/app/shared/event-video.service';
import { environment } from 'src/environments/environment';
import { FullscreenPage } from '../fullscreen/fullscreen.page';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.page.html',
  styleUrls: ['./view-event.page.scss'],
})
export class ViewEventPage implements OnInit {
  public wPlatform = false;
  public aPlatform = false;
  public iPlatform = false;
  private url: string = null;
  private sturl: string = null;
  private stlang: string = null;
  private stoptions: any = null;
  private platform: string = null;
  private testApi = false;

  apiUrl: string;

  eventVideo: any;
  id: any;

  constructor(
    private eventVideoAPI: EventVideoService,
    private actRoute: ActivatedRoute,
    public modalCtrl: ModalController
  ) {
    this.apiUrl = environment.api_url;
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.eventVideoAPI.getEventVideo(this.id).subscribe(res => {
      this.eventVideo = res;
      console.log(res)
      /*this.eventVideo["posterUrl"] = res['posterUrl'];
      this.eventVideo["description"] = res['description'];
      this.eventVideo["price"] = res['price'];
      this.eventVideo["beginDate"] = res['beginDate'];
      this.eventVideo["endDate"] = res['endDate'];
      this.eventVideo["type"] = res['type'];
      this.eventVideo["source"] = res['source'];
      this.eventVideo["videoUrl"] = res['videoUrl'];*/
    });
    this.platform = Capacitor.getPlatform();
    console.log(`$$$ platform: ${this.platform}`);
    if (this.platform === 'ios' || this.platform === 'android') {
      if (this.platform === 'ios') {
        this.iPlatform = true;
        this.aPlatform = false;
      } else {
        this.iPlatform = false;
        this.aPlatform = true;
      }
      this.wPlatform = false;
    } else {
      this.wPlatform = true;
      this.iPlatform = false;
      this.aPlatform = false;
    }
    console.log(`$$$ iPlatform: ${this.iPlatform}`);
    console.log(`$$$ aPlatform: ${this.aPlatform}`);
    console.log(`$$$ wPlatform: ${this.wPlatform}`);
  }

  async testVideoPlayerPlugin() {
    var vType = this.eventVideo.source;

    this.url = this.eventVideo.videoUrl;
    this.sturl = 'https://brenopolanski.github.io/html5-video-webvtt-example/MIB2-subtitles-pt-BR.vtt';
    this.stlang = 'es';
    this.stoptions = {backgroundColor:'rgba(0,0,0,0)', fontSize: 18, foregroundColor:'rgba(128,128,0,1)'};


    if(vType === 'mp4') {
    } else if (vType === 'webm') {
    } else if (vType === 'hls') {
    } else if (vType === 'mpd') {
    } else if (vType === 'smooth') {
    } else if (vType === 'aws') {
    } else if (vType === 'youtube') {
    } else if (vType === 'application') {
    } else if (vType === 'internal') {
    } else if (vType === 'asset' && this.iPlatform) {
    } else if (vType === 'asset' && this.aPlatform) {
    } else if (vType === 'asset' && this.wPlatform) {
    } else if (vType === 'dcim' && this.aPlatform) {
    } else if (vType === 'extSdCard' && this.aPlatform) {
    } else if (vType === 'intFileIOS' && this.iPlatform) {
    } else if (vType === 'dcimIOS' && this.iPlatform) {
    } else {
      console.log('Video format not supported');
    }
    

    console.log(`>>> this.url ${this.url}`);
    console.log(`>>> this.sturl ${this.sturl}`);
    console.log(`>>> this.stlang ${this.stlang}`);
    console.log(`>>> this.stoptions ${JSON.stringify(this.stoptions)}`);
    const modal = await this.modalCtrl.create({
      component: FullscreenPage,
      componentProps: {
        url: this.url,
        sturl: this.sturl,
        stlang: this.stlang,
        stoptions: this.stoptions,
        testApi: this.testApi,
        platform: this.platform
      },
      swipeToClose: true
    });
    await modal.present();
  }


}
