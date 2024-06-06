import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from './common/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  
  public togglePlayer = false;

  constructor(
    private sharedService: SharedService) {

  }

  /*@Output() onPlusClick = new EventEmitter<boolean>();

  plusClick() {
    
    this.onPlusClick.emit(true);
    console.log(this.togglePlayer);

    
  }*/

  public get showPlayer(): boolean {
    return this.sharedService.showPlayer;
    // _sharedService is the injected Service
  }
  
}
