/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewPageComponent } from './review-page.component';
import { dispatchEvent } from '../../../testing/form-helper';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { AssessmentService } from '../../core/shared/assessment.service';
import { AssessmentServiceStub } from '../../../testing/assessment-service-stub';
import { RouterStub } from '../../../testing/router-stub';
import { Question } from '../../shared/model/question';
import { ReviewModalComponent } from './review-modal.component';
import { ApplymentModule } from '../applyment.module';
import { ComponentRef } from '@angular/core';

describe('ReviewPageComponent', () => {
  let component: ReviewPageComponent;
  let fixture: ComponentFixture<ReviewPageComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let assessmentService: AssessmentServiceStub;
  let questionsStub: Question[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ApplymentModule],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
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

});
