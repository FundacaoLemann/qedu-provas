import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReviewPageComponent } from './review-page.component';
import { dispatchEvent } from '../../../testing/testing-helper';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { AssessmentService } from '../../core/shared/assessment.service';
import { RouterStub } from '../../../testing/router-stub';
import { ApplymentModule } from '../applyment.module';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ApplymentService } from '../../core/shared/applyment.service';
// Rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
// Utils
import * as json from '../../utils/json';
import { NoConnectionModalComponent } from '../shared/no-connection-modal/no-connection-modal.component';
const db = require('../../../../mock/db.json');

describe('ReviewPageComponent', () => {
  let component: ReviewPageComponent;
  let fixture: ComponentFixture<ReviewPageComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let assessmentService: AssessmentService;
  let applymentService: ApplymentService;
  const mockQuestions = db.questions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ApplymentModule,
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useFactory: () => new ActivatedRouteStub({ uuid: '1' }) },
        ApplymentService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);

    assessmentService = fixture.debugElement.injector.get(AssessmentService);

    applymentService = fixture.debugElement.injector.get(ApplymentService);
    // init questions with 10
    applymentService.initAnswers(mockQuestions.length);
    // Set two correct answers
    applymentService.setAnswer(0, 1);
    applymentService.setAnswer(3, 2);

    spyOn(assessmentService, 'getQuestions').and.returnValue(Observable.of(json.camelizeObject(mockQuestions)));

    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should return to the last question when back is clicked', async(() => {
    component.questions = mockQuestions;

    spyOn(router, 'navigate');

    dispatchEvent(fixture, '[back]', 'click');
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'questao', mockQuestions.length]);
  }));

  it('should create a modal when the finish button is clicked', fakeAsync(() => {
    dispatchEvent(fixture, '[button-finish]', 'click');
    tick(301);
    fixture.detectChanges();
    expect(component.modalRef).toEqual(jasmine.any(ComponentRef));
  }));

  it('should display the amount of answered questions', async(() => {
    component.load();
    fixture.detectChanges();
    const answeredQuestions = fixture.debugElement.query(By.css('.items_count')).nativeElement.innerHTML;

    expect(answeredQuestions).toEqual('2 de 10 questões');
  }));

  it('should display the answers', async(() => {
    const tableItems = fixture.debugElement.queryAll(By.css('tbody tr')).length;
    const tableItemsAnswered = fixture.debugElement.queryAll(By.css('tbody tr:not(.danger)')).length;

    expect(tableItems).toEqual(mockQuestions.length);
    expect(tableItemsAnswered).toEqual(2);
  }));

  it('should create warning modal when offline', fakeAsync(() => {
    component.openNoConnectionModal();
    tick(300);
    expect(component.modalRef.instance).toEqual(jasmine.any(NoConnectionModalComponent));
  }));

});
