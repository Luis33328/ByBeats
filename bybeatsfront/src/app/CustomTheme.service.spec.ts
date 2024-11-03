/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomThemeService } from './CustomTheme.service';

describe('Service: CustomTheme', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomThemeService]
    });
  });

  it('should ...', inject([CustomThemeService], (service: CustomThemeService) => {
    expect(service).toBeTruthy();
  }));
});
