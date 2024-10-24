import { Injectable } from '@angular/core';
import { ThemeService } from 'ng2-charts';

@Injectable({
  providedIn: 'root',
})
export class CustomThemeService extends ThemeService {
  constructor() {
    super();
  }
}