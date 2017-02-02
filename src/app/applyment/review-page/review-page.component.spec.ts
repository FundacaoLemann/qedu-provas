import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { Observable } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import * as json from '../../utils/json';
const db = require('../../../../mock/db.json');

describe('ReviewPageComponent', () => {
  let component: ReviewPageComponent;
  let fixture: ComponentFixture<ReviewPageComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let assessmentService: AssessmentService;
  let applymentService: ApplymentService;
  let mockQuestions = db.questions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          ApplymentModule,
          SharedModule,
          // RouterTestingModule.withRoutes([])
        ],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useFactory: () => new ActivatedRouteStub({ uuid: '1' }) },
          ApplymentService
        ]
      })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReviewPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);

    assessmentService = fixture.debugElement.injector.get(AssessmentService);

    applymentService = fixture.debugElement.injector.get(ApplymentService);
    //init questions with 10
    applymentService.initAnswers(mockQuestions.length);
    // Set two correct answers
    applymentService.setAnswer(0, 1);
    applymentService.setAnswer(3, 2);

    spyOn(assessmentService, 'getQuestions').and.returnValue(Observable.of(json.camelizeObject(mockQuestions)));

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return to the last question when back is clicked', () => {
    component.questions = mockQuestions;

    spyOn(router, 'navigate');

    dispatchEvent(fixture, '[back]', 'click');
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'questao', mockQuestions.length]);
  });

  it('should create a modal when the finish button is clicked', async(() => {
    dispatchEvent(fixture, '[button-finish]', 'click');
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

});
