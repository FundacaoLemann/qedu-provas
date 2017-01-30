/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewPageComponent } from './review-page.component';
import { dispatchEvent } from '../../../testing/testing-helper';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { AssessmentService } from '../../core/shared/assessment.service';
import { AssessmentServiceStub } from '../../../testing/assessment-service-stub';
import { RouterStub } from '../../../testing/router-stub';
import { Question } from '../../shared/model/question';
import { ApplymentModule } from '../applyment.module';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CoreModule } from '../../core/core.module';
import { ApplymentService } from '../../core/shared/applyment.service';

describe('ReviewPageComponent', () => {
  let component: ReviewPageComponent;
  let fixture: ComponentFixture<ReviewPageComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let assessmentService: AssessmentServiceStub;
  let applymentService: ApplymentService;
  let questionsStub: Question[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ApplymentModule, CoreModule],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useFactory: () => new ActivatedRouteStub() },
          { provide: AssessmentService, useClass: AssessmentServiceStub }
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

    // Set a fake answer
    applymentService = fixture.debugElement.injector.get(ApplymentService);
    applymentService.setAnswer(0, 1);

    // Set a fake route
    route.testParams = { uuid: '1' };

    assessmentService.getQuestions('1').subscribe(questions => questionsStub = questions);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return to the last question when back is clicked', () => {
    component.questions = questionsStub;

    spyOn(router, 'navigate');

    dispatchEvent(fixture, '[back]', 'click');
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'questao', questionsStub.length]);
  });

  it('should create a modal when the finish button is clicked', async(() => {
    dispatchEvent(fixture, '[button-finish]', 'click');
    fixture.detectChanges();
    expect(component.modalRef).toEqual(jasmine.any(ComponentRef));
  }));

  it('should display the amount of answered questions', async(() => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.items_count')).nativeElement.innerHTML).toEqual('1 de 2 questões');
  }));

});
