/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ApplymentComponent } from './applyment.component';
import { ApplymentModule } from "./applyment.module";
import { RouterModule } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";

describe('ApplymentComponent', () => {
  let component: ApplymentComponent;
  let fixture: ComponentFixture<ApplymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             imports: [
               ApplymentModule,
               RouterModule.forRoot([])
             ],
             providers: [
               { provide: APP_BASE_HREF, useValue: '/' }
             ]
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
