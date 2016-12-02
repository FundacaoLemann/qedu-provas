///<reference path="../../../../node_modules/@angular/core/testing/fake_async.d.ts"/>
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Router } from '@angular/router';
import { RouterStub } from '../../../testing/router-stub';
import { SharedModule } from '../../shared/shared.module';

import { setInputValue, dispatchEvent } from "../../../testing/form-helper";
import { InstructionsComponent } from "./instructions.component";
import { ASSESSMENTS } from "../../../mocks/assessments-mock";


describe('InstructionsComponent', () => {
  let component: InstructionsComponent;
  let fixture: ComponentFixture<InstructionsComponent>;
  let routerService: Router;
  let assessment = ASSESSMENTS[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             imports: [SharedModule],
             declarations: [ InstructionsComponent ],
             providers: [
               { provide: Router, useValue: new RouterStub() }
             ]
           })
           .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsComponent);
    component = fixture.componentInstance;
    routerService = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an assessment details', () => {
    let instructionEl = fixture.debugElement.query(By.css('.instructions')).nativeElement;
    expect(instructionEl.textContent).toEqual(assessment.instructions);

    let durationEl = fixture.debugElement.query(By.css('.duration')).nativeElement;
    expect(durationEl.textContent).toEqual(`${assessment.duration} minutos`);

    let itemsCountEl = fixture.debugElement.query(By.css('.items_count')).nativeElement;
    expect(itemsCountEl.textContent).toEqual(`${assessment.items_count} questões`);
  });
});
