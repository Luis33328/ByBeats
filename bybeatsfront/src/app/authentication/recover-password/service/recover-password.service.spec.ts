/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecoverPasswordService } from './recover-password.service';

describe('Service: RecoverPassword', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecoverPasswordService]
    });
  });

  it('should ...', inject([RecoverPasswordService], (service: RecoverPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
