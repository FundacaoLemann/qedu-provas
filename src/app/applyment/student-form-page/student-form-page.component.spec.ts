///<reference path="../../../../node_modules/@angular/core/testing/fake_async.d.ts"/>
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RouterStub } from '../../../testing/router-stub';
import { SharedModule } from '../../shared/shared.module';
import { StudentFormPageComponent } from "./student-form-page.component";
import { Assessment } from "../../shared/model/assessment";

import { ActivatedRouteStub } from "../../../testing/activated-route-stub";
import { StoreService } from "../../core/shared/store.service";

import { setInputValue, getInputValue } from "../../../testing/form-helper";
import { ASSESSMENTS } from '../../../mocks/assessments-mock';

describe('StudentFormPageComponent', () => {
  let component: StudentFormPageComponent;
  let fixture: ComponentFixture<StudentFormPageComponent>;
  let routerService: Router;
  let storeService: StoreService;
  let assessment: Assessment;
  let route = new ActivatedRouteStub();


  beforeEach(async(() => {
    assessment = ASSESSMENTS[0];
    route.testParams = { uuid: assessment.uuid };

    TestBed.configureTestingModule({
             imports: [SharedModule],
             declarations: [StudentFormPageComponent],
             providers: [
               StoreService,
               { provide: Router, useValue: new RouterStub() },
               { provide: ActivatedRoute, useValue: route }
             ]
           })
           .compileComponents();

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFormPageComponent);
    component = fixture.componentInstance;
    routerService = fixture.debugElement.injector.get(Router);
    storeService = fixture.debugElement.injector.get(StoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the assessment title', () => {
    let title = fixture.debugElement.query(By.css('.title')).nativeElement.textContent;
    expect(title).toEqual(assessment.title);
  });

  it('should display the student data if already set', () => {
    storeService.setStudent({ name: 'John Doe', 'register_number': '' });
    fixture.detectChanges();
    expect(getInputValue(fixture, '#name')).toEqual('John Doe');
  });

  it('should navigate to instructions-page when has no errors', () => {
    spyOn(routerService, 'navigate');
    spyOn(storeService, 'setStudent');

    setInputValue(fixture, '#name', 'John Doe');
    component.onSubmit();

    expect(routerService.navigate).toHaveBeenCalledWith(['prova', assessment.uuid, 'instructions']);
    expect(storeService.setStudent).toHaveBeenCalledWith({ name: 'John Doe', register_number: '' });
  });

  describe('Form validation', () => {
    it('should display form validation errors', () => {
      let nameControl = component.form.get('name');

      expect(nameControl.errors).toEqual({ required: true });

      setInputValue(fixture, '#name', 'renan');
      expect(nameControl.errors).toBe(null);

      setInputValue(fixture, '#name', '');
      fixture.detectChanges();

      let nameErrorMessages = fixture.debugElement.query(By.css('.name_errors span')).nativeElement;
      expect(nameControl.errors).toEqual({ required: true });
      expect(nameErrorMessages.textContent).toEqual('Campo obrigatório');

      setInputValue(fixture, '#name', 'renan@azevedo1');
      fixture.detectChanges();

      nameErrorMessages = fixture.debugElement.query(By.css('.name_errors span')).nativeElement;
      expect(nameErrorMessages.textContent).toEqual('Caracteres inválidos: @1');
    });
  });
});
