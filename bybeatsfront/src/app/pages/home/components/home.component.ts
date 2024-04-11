import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import {NgxTinySliderSettingsInterface, NgxTinySliderComponent} from 'ngx-tiny-slider';
import { SignInService } from '../../../authentication/signIn/service/signIn.service';
import { BeatService } from '../../beats/service/beat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public role = "";

  public beats = [];

  public beatsDesc = [];

  public form: FormGroup = new FormGroup({});

  @ViewChildren("slideList") slideList: QueryList<any>;
  @ViewChild("ngxSlider", { static: false }) private ngxSlider: ElementRef<NgxTinySliderComponent>;
  tinySliderConfig: NgxTinySliderSettingsInterface;


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private beatService: BeatService,
    private usuarioService: SignInService,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.getBeats();
    this.getBeatsDesc();


    this.getUserRole();

    this.tinySliderConfig = {
      waiteForDom: true,
      slideBy: 6,
      items: 6,
      speed: 400,
      loop: true,
      nav: false,
      controlsText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>']
    };
  }
  
  public view(event) {
    this.router.navigate(['/beat/' + event]);
  }


  public getId(row) {
    console.log(row);
    this.view(row.guidBeat);
  }
  


  public ngAfterViewInit() {
    // @ts-ignore
    this.slideList.changes.subscribe(() => this.ngxSlider.domReady.next());
    if (this.beatsDesc.length > 0) {
      console.log(this.beatsDesc);
      // @ts-ignore
      this.ngxSlider.domReady.next();
    }
  }

  private getBeats(){
    this.beatService.listWithoutPaginator().subscribe(data => {
      this.beats = data;
      console.log(data);
    }, err => {
      console.log("List Error.")
    });
  }

  private getBeatsDesc(){
    this.beatService.listDesc().subscribe(data => {
      this.beatsDesc = data;
      console.log(data);
    }, err => {
      console.log("List Error.")
    });
  }

  private getUserRole() {
    this.usuarioService.getByUsername().subscribe(data => {
      console.log(data.role);
      this.role = data.role;
    }, err => {
      console.log("Role error.");
    });
  }

}
