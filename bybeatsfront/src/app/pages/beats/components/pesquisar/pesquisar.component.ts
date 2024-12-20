import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import { PageEvent } from '@angular/material/paginator';
import { BeatService } from '../../service/beat.service';

@Component({
  selector: 'app-pesquisar-beat',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.scss']
})
export class PesquisarBeatComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public beats = [];
  public bpmMin = 24;
  public bpmMax = 300;
  private searchTerm: string = '';
  private lastSortedProperty: string = '';
  private sortDirection: number = 1;
  private originalOrders = {};
  private lastSortedDirections = {};
  public pageSize = 12;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageEvent: PageEvent;
  public displayedBeats = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private beatService: BeatService,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.getBeats();
  }

  public getBeats() {
    this.beatService.listWithoutPaginator().subscribe(data => {
      this.beats = data.filter(beat => beat.bpm >= this.bpmMin && beat.bpm <= this.bpmMax);
      this.displayedBeats = this.beats.slice(0, this.pageSize); 
      console.log(data);
    }, err => {
      console.log("List Error.");
    });
  }

  public view(event) {
    this.router.navigate(['/beat/' + event]);
  }

  public getId(row) {
    console.log(row);
    this.view(row.guidBeat);
  }

  public paginate(event: PageEvent) {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    this.displayedBeats = this.beats.slice(start, end);
    this.pageEvent = event;
  }

  public orderBy(property: string) {
    if (!this.originalOrders[property]) {
      this.originalOrders[property] = [...this.beats];
    }
  
    if (this.lastSortedProperty === property) {
      if (this.lastSortedDirections[property] === 1) {
        this.beats.sort((a, b) => {
          if (typeof a[property] === 'number' && typeof b[property] === 'number') {
            return b[property] - a[property];
          }
          return b[property].localeCompare(a[property]);
        });
        this.lastSortedDirections[property] = -1;
      } else if (this.lastSortedDirections[property] === -1) {
        this.beats = [...this.originalOrders[property]];
        this.lastSortedDirections[property] = 0;
      } else {
        this.beats.sort((a, b) => {
          if (typeof a[property] === 'number' && typeof b[property] === 'number') {
            return a[property] - b[property];
          }
          return a[property].localeCompare(b[property]);
        });
        this.lastSortedDirections[property] = 1;
      }
    } else {
      this.beats.sort((a, b) => {
        if (typeof a[property] === 'number' && typeof b[property] === 'number') {
          return a[property] - b[property];
        }
        return a[property].localeCompare(b[property]);
      });
      this.lastSortedProperty = property;
      this.lastSortedDirections[property] = 1;
    }
  
    this.pageEvent = { pageIndex: 0, pageSize: this.pageSize, length: this.beats.length };
    this.displayedBeats = this.beats.slice(0, this.pageSize);
  }

  public onBpmMinChange(value: number) {
    if (value > this.bpmMax) {
      this.bpmMin = this.bpmMax;
    } else {
      this.bpmMin = value;
    }
    this.getBeats();
  }

  public onBpmMaxChange(value: number) {
    if (value < this.bpmMin) {
      this.bpmMax = this.bpmMin;
    } else {
      this.bpmMax = value;
    }
    this.getBeats();
  }
}