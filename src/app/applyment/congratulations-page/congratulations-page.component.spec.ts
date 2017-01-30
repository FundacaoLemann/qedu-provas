/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
// App
import { CongratulationsPageComponent } from './congratulations-page.component';
import { ApplymentModule } from '../applyment.module';
import { Router } from '@angular/router';
import * as test from '../../../testing/testing-helper';
import { Component } from '@angular/core';

@Component({
  template: '<router-outlet></router-outlet>'
})
class RedirectComponent {
}

describe('CongratulationsPageComponent', () => {
  let component: CongratulationsPageComponent;
  let fixture: ComponentFixture<CongratulationsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          ApplymentModule,
          RouterTestingModule.withRoutes([
            { path: 'home', component: RedirectComponent }
          ])
        ],
        declarations: [RedirectComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratulationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirect to home', () => {
    const el = test.getNativeElement(fixture, 'a[continue]');
    expect(el.attributes.href.value).toEqual('/');
  });

});
