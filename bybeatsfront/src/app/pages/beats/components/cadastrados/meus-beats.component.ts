import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import {NgxTinySliderSettingsInterface, NgxTinySliderComponent} from 'ngx-tiny-slider';
import { BeatService } from '../../service/beat.service';
import { SignIn } from 'src/app/authentication/signIn/model/signIn.model';
import { SignInService } from '../../../../authentication/signIn/service/signIn.service';

@Component({
  selector: 'app-meus-beats',
  templateUrl: './meus-beats.component.html',
  styleUrls: ['./meus-beats.component.scss']
})
export class MeusBeatsComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public beats = [];

  userModel:SignIn;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private beatService: BeatService,
    private usuarioService: SignInService,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.getLogged()
    
  }

  private getBeats(){
    
    this.beatService.getMeusBeats(this.userModel).subscribe(data => {
      this.beats = data;
      console.log(data);
    }, err => {
      console.log(err)
      console.log("List Error.")
    });
  }

  private getLogged() {
    this.usuarioService.getByUsername().subscribe(data => {
      this.userModel = data;
      console.log(this.userModel)
      this.getBeats()

    }, err => {
    });
  }

  public view(event) {
    this.router.navigate(['/beat/' + event]);
  }


  public getId(row) {
    console.log(row);
    this.view(row.guidBeat);
  }


  public edit(event) {
    this.router.navigate(['/beats/register/' + event]);
  }


  public getIdEdit(row) {
    console.log(row);
    this.edit(row.guidBeat);
  }


}
