/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LicenciamentoComponent } from './licenciamento.component';

describe('LicenciamentoComponent', () => {
  let component: LicenciamentoComponent;
  let fixture: ComponentFixture<LicenciamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenciamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenciamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
