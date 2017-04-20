import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { ReviewPageComponent } from './review-page.component';
import { dispatchEvent, createResponse } from '../../../testing/testing-helper';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { RouterStub } from '../../../testing/router-stub';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ApplymentService } from '../shared/applyment.service';
import { NoConnectionModalComponent } from '../shared/no-connection-modal/no-connection-modal.component';
import { ApplymentModule } from '../applyment.module';
import { camelizeObject } from '../../utils/json';
import { AssessmentService } from '../../core/shared/assessment.service';
import Mock from '../../../../mock/mock';
import { Observable } from 'rxjs/Observable';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Http } from '@angular/http';

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
    applymentService.initAnswers(QUESTIONS.length);
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

  it('should display the answers', async(() => {
    const tableItems = fixture.debugElement.queryAll(By.css('tbody tr')).length;
    const tableItemsAnswered = fixture.debugElement.queryAll(By.css('tbody tr:not(.danger)')).length;

    expect(tableItems).toEqual(QUESTIONS.length);
    expect(tableItemsAnswered).toEqual(3);
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
      spyOn(component, 'finishAndRedirect');

      component.submit();

      expect(component.finishAndRedirect).toHaveBeenCalled();
    }));

    it('should display modal error on failure',
      async(inject([Http], (http: Http) => {
        const message = 'Você não tem autorização para fazer essa prova';

        spyOn(http, 'post').and.returnValue(Observable.throw(message));

        component.submit();

        const modalInstance = component.modalRef.instance;
        expect(modalInstance).toEqual(jasmine.any(ErrorModalComponent));
        expect(modalInstance.message.replace(/"/g, '')).toEqual(message);
      }))
    );
  });

  describe('finishAndRedirect()', () => {
    it('should put a finish request and redirect on success', async(() => {
      const fakeMessage = 'Prova finalizada com sucesso';
      spyOn(assessmentService, 'finishAssessment').and.returnValue(Observable.of(fakeMessage));
      spyOn(router, 'navigate');

      const assessmentToken = applymentService.getAssessment().token;
      const studentToken = applymentService.getStudent().token;

      component.finishAndRedirect();

      expect(assessmentService.finishAssessment).toHaveBeenCalledWith(assessmentToken, studentToken);
      expect(router.navigate).toHaveBeenCalledWith(['prova', assessmentToken, 'parabens']);
    }));
  });

  describe('openErrorModal()', () => {
    it('should create a modal with custom message', () => {
      const message = 'Assessment not found.';
      component.openErrorModal(message);

      const modalInstance = component.modalRef.instance;
      expect(modalInstance).toEqual(jasmine.any(ErrorModalComponent));
      expect(modalInstance.message.replace(/"/g, '')).toEqual(message);
    });
  });
});
