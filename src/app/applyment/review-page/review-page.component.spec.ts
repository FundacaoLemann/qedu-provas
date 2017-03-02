import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReviewPageComponent } from './review-page.component';
import { dispatchEvent } from '../../../testing/testing-helper';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { RouterStub } from '../../../testing/router-stub';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ApplymentService } from '../shared/applyment.service';
import { NoConnectionModalComponent } from '../shared/no-connection-modal/no-connection-modal.component';
import { ApplymentModule } from '../applyment.module';
// Rxjs
import 'rxjs/add/observable/of';
import { camelizeObject } from '../../utils/json';
import { Observable } from 'rxjs/Observable';
import { AssessmentService } from '../../core/shared/assessment.service';

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
    TestBed.configureTestingModule({
      imports: [
        ApplymentModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useFactory: () => new ActivatedRouteStub({ token: '1' }) }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);

    applymentService = fixture.debugElement.injector.get(ApplymentService);
    applymentService.setAssessment(camelizeObject(ASSESSMENT));
    applymentService.setStudent(camelizeObject(STUDENT));
    applymentService.setQuestions(camelizeObject(QUESTIONS));
    applymentService.initAnswers(QUESTIONS.length);
    applymentService.setSingleAnswer(0, 1);
    applymentService.setSingleAnswer(1, 3);
    applymentService.setSingleAnswer(2, 5);

    assessmentService = fixture.debugElement.injector.get(AssessmentService);

    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should return to the last question when back is clicked', async(() => {
    component.questions = QUESTIONS;

    spyOn(router, 'navigate');

    dispatchEvent(fixture, '[back]', 'click');
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['prova', ASSESSMENT.id.toString(), 'questao', QUESTIONS.length]);
  }));

  it('should create a modal when the finish button is clicked', fakeAsync(() => {
    dispatchEvent(fixture, '[button-finish]', 'click');
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

  it('should finish the assessment', () => {
    spyOn(assessmentService, 'postAssessment').and.returnValue(Observable.of({ status: 201, statusText: 'Created' }));

    const post = applymentService.getApplymentStatus();

    component.submitAssessment();
    expect(assessmentService.postAssessment).toHaveBeenCalledWith(post);
  });
});
