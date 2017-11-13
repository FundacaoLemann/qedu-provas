import { ComponentRef } from '@angular/core';
import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Http } from '@angular/http';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import Mock from '../../../../mock/mock';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { RouterStub } from '../../../testing/router-stub';
import { createResponse, dispatchEvent } from '../../../testing/testing-helper';
import { AssessmentService } from '../../core/shared/assessment.service';
import { camelizeObject } from '../../utils/json';
import { ApplymentModule } from '../applyment.module';
import { ApplymentService } from '../shared/applyment.service';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';
import { NoConnectionModalComponent } from '../shared/no-connection-modal/no-connection-modal.component';
import { ReviewPageComponent } from './review-page.component';

const db = require('../../../../mock/db.json');

describe('ReviewPageComponent', () => {
  let component: ReviewPageComponent;
  let fixture: ComponentFixture<ReviewPageComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let applymentService: ApplymentService;
  let assessmentService: AssessmentService;
  const ASSESSMENT = db.assessments[0];
  const STUDENT = db.students[0];
  const QUESTIONS = db.questions;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          ApplymentModule
        ],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useFactory: () => new ActivatedRouteStub({ token: ASSESSMENT.token }) }
        ]
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);

    applymentService = fixture.debugElement.injector.get(ApplymentService);
    applymentService.setAssessment(camelizeObject(ASSESSMENT));
    applymentService.setStudent(camelizeObject(STUDENT));
    applymentService.setItems(camelizeObject(QUESTIONS));
    applymentService.initAnswers(5);
    applymentService.setAnswer(0, Mock.mockAnswer(0));
    applymentService.setAnswer(1, Mock.mockAnswer(1));
    applymentService.setAnswer(2, Mock.mockAnswer(2));

    assessmentService = fixture.debugElement.injector.get(AssessmentService);

    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should return to the last question when [back] is clicked', async(() => {
    component.questions = QUESTIONS;
    spyOn(router, 'navigate');
    dispatchEvent(fixture, '[back]', 'click');
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['prova', ASSESSMENT.token, 'questao', QUESTIONS.length]);
  }));

  it('should create a modal when the [button-deliver] is clicked', fakeAsync(() => {
    dispatchEvent(fixture, '[button-deliver]', 'click');
    tick(301);
    fixture.detectChanges();
    expect(component.modalRef).toEqual(jasmine.any(ComponentRef));
  }));

  it('should display the amount of answered questions', async(() => {
    component.ngOnInit();
    fixture.detectChanges();

    const answeredQuestions = fixture.debugElement.query(By.css('.items_count')).nativeElement.innerHTML;
    const message = `3 de ${QUESTIONS.length} questões`;

    expect(answeredQuestions).toEqual(message);
  }));

  it('should create warning modal when offline', fakeAsync(() => {
    component.openNoConnectionModal();
    tick(10000);
    fixture.detectChanges();
    expect(component.modalRef.instance).toEqual(jasmine.any(NoConnectionModalComponent));
  }));

  describe('submit()', () => {
    it('should successfully post a request the answers', async(() => {
      const fakeResponse = createResponse(200, 'OK', null);

      spyOn(assessmentService, 'postAnswers').and.returnValue(Observable.of(fakeResponse));
      spyOn(router, 'navigate');
      
      component.submit();

      const assessmentToken = applymentService.getAssessment().token;

      expect(router.navigate).toHaveBeenCalledWith(['prova', assessmentToken, 'parabens']);
    }));

    it('should display modal error on response failure',
      fakeAsync(inject([Http], (http: Http) => {
        const message = 'Você não tem autorização para fazer essa prova';
        const response = createResponse(403, 'Forbidden', { message });

        spyOn(http, 'post').and.returnValue(Observable.throw(response));

        component.submit();
        tick(300);

        const modalInstance = component.modalRef.instance;
        expect(modalInstance).toEqual(jasmine.any(ErrorModalComponent));
        expect(modalInstance.message.replace(/"/g, '')).toEqual(message);

        discardPeriodicTasks();
      }))
    );
  });

  describe('notAnswered', () => {
    it('should set not answered indexes', () => {
      const answers = applymentService.getAllAnswers();

      component.setNotAnswered(answers);

      expect(component.notAnswered).toEqual([4, 5]);
    });
  });

});
