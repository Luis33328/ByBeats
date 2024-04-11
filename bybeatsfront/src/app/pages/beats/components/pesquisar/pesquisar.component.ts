import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import {NgxTinySliderSettingsInterface, NgxTinySliderComponent} from 'ngx-tiny-slider';
import { BeatService } from '../../service/beat.service';

@Component({
  selector: 'app-pesquisar-beat',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.scss']
})
export class PesquisarBeatComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public beats = [];


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private beatService: BeatService,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.getBeats()
  }

  private getBeats(){
    this.beatService.listWithoutPaginator().subscribe(data => {
      this.beats = data;
      console.log(data);
    }, err => {
      console.log("List Error.")
    });
  }


  public view(event) {
    this.router.navigate(['/beat/' + event]);
  }


  public getId(row) {
    console.log(row);
    this.view(row.guidBeat);
  }



}
