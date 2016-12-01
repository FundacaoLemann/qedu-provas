/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ApplymentComponent } from './applyment.component';

describe('ApplymentComponent', () => {
  let component: ApplymentComponent;
  let fixture: ComponentFixture<ApplymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
