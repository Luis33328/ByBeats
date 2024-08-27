import { AfterContentInit, AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { ConverterUtils } from 'src/app/common/converter.utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInService } from '../authentication/signIn/service/signIn.service';
import { OrderService } from '../pages/beats/service/order.service';
import { ProductOrder } from '../pages/beats/model/productOrder.model';
import { ProductOrders } from '../pages/beats/model/productOrders.model';
import { Beat } from '../pages/beats/model/beat.model';
import { BeatService } from 'src/app/pages/beats/service/beat.service';
import { Usuario } from 'src/app/pages/usuario/model/usuario.model';
import { SignIn } from 'src/app/authentication/signIn/model/signIn.model';

import * as moment from 'moment';
import { SharedService } from '../common/shared.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterContentInit  {


  public role = "";
  public user = "";
  public userModel:SignIn;

  title = 'angular-music-player';
  audio = new Audio();
  musicLength: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';

  public beat = [];
  public beatModel:Beat;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private usuarioService: SignInService,
    private sharedService: SharedService,
    private beatService: BeatService,){
      this.audio.ondurationchange = () => {
        const totalSeconds = Math.floor(this.audio.duration),
              duration = moment.duration(totalSeconds, 'seconds');
        this.musicLength = duration.seconds() < 10 ? 
                           `${Math.floor(duration.asMinutes())}:
                            0${duration.seconds()}` : 
                           `${Math.floor(duration.asMinutes())}:
                            ${duration.seconds()}`;
        this.duration = totalSeconds;
    }

    this.audio.ontimeupdate = () => {
      const duration = moment.duration(
        Math.floor(this.audio.currentTime), 'seconds');
      this.currentTime = duration.seconds() < 10 ? 
                         `${Math.floor(duration.asMinutes())}:
                          0${duration.seconds()}` : 
                         `${Math.floor(duration.asMinutes())}:
                          ${duration.seconds()}`;
    }

    /*this.getAllMusic().subscribe((musicList: Music[]) => {
      this.musicList = musicList;
    });*/
  }
  trackPointer: number = 0;

  public ngOnInit() {
    this.getBeat();
    //console.log(this.sharedService.beat[0].wavUntagged);
    //this.play(this.sharedService.beat[0].wavUntagged);
    
  }

  public ngAfterContentInit(){
    //this.play(this.beat[0].wavTagged);
    //console.log(this.sharedService.beat);
  }

  

  /*private getBeats(){
    this.beatService.listWithoutPaginator().subscribe(data => {
      this.beats = data;
      console.log(data);
    }, err => {
      console.log("List Error.")
    });
  }*/


  private getBeat(){
    this.beat = this.sharedService.beat; 
    //this.beatModel = this.beat[0];
    //console.log(this.beat);
    //console.log(this.beatModel.wavTagged);
    
  }

  private getLogged() {
    this.usuarioService.getByUsername().subscribe(data => {
      this.user = data.login;
      this.userModel = data;
      console.log(this.userModel);

    }, err => {
      console.log("eero");
    });
  }

  play(beat): void {
    //if (index === undefined) {
      if (this.audio.paused) {
        if (this.audio.readyState === 0) {
          this.trackPointer = 0;
          this.audio.src = "../assets/uploads/" + beat;
        }
        this.audio.play();
      } else {
        this.audio.pause();
      }
    /*} else {
      this.trackPointer = index;
      this.currentMusic = this.musicList[index];
      this.audio.src = this.currentMusic.url;
      this.audio.play();
    //} */
  }

  /*prev(): void {
    this.trackPointer--;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }

  next(): void {
    this.trackPointer++;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }*/

  volumeSlider(event: any) {
    this.audio.volume = event.value / 16;
  }

  durationSlider(event: any) {
    this.audio.currentTime = event.value;
  }

  /*getAllMusic(): Observable<Music[]> {
    return this.store
      .collection('music', 
      ref => ref.orderBy('title'))
      .valueChanges({ idField: 'id' }).pipe() as Observable<Music[]>;
  }*/



}
