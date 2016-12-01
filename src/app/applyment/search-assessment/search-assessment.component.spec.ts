///<reference path="../../../../node_modules/@angular/core/testing/fake_async.d.ts"/>
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Router } from '@angular/router';
import { RouterStub } from '../../../testing/router-stub';
import { SharedModule } from '../../shared/shared.module';
import { SearchAssessmentComponent } from "./search-assessment.component";

import { setInputValue, dispatchEvent } from "../../../testing/form-helper";


describe('SearchAssessmentComponent', () => {
  let component: SearchAssessmentComponent;
  let fixture: ComponentFixture<SearchAssessmentComponent>;
  let routerService: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ SearchAssessmentComponent ],
      providers: [
        { provide: Router, useValue: new RouterStub() }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAssessmentComponent);
    component = fixture.componentInstance;
    routerService = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to `prova/7sk0d88kw9` when `Buscar` button is clicked', async(() => {
    // Spy on service
    spyOn(routerService, 'navigate');
    // Change the input
    setInputValue(fixture, 'input', '7sk0d88kw9');
    dispatchEvent(fixture, 'button.search', 'click');

    fixture.whenStable().then(() => {
      expect(routerService.navigate).toHaveBeenCalledWith(['prova', '7sk0d88kw9'])
    });

  }));
});
