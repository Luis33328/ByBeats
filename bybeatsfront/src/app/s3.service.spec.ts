/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { S3Service } from './s3.service';

describe('Service: S3', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [S3Service]
    });
  });

  it('should ...', inject([S3Service], (service: S3Service) => {
    expect(service).toBeTruthy();
  }));
});
