import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericFilter } from 'src/app/common/generic.filter';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Beat } from '../pages/beats/model/beat.model';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public showPlayer: boolean = false;
    
  public beat:Beat;

  public change: boolean = false;

}
