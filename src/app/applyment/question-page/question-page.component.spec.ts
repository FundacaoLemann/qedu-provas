/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionPageComponent } from './question-page.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { RouterStub } from '../../../testing/router-stub';
import { ApplymentModule } from '../applyment.module';
import { AssessmentService } from '../../core/shared/assessment.service';
import { AssessmentServiceStub } from '../../../testing/assessment-service-stub';
import { ApplymentService } from '../../core/shared/applyment.service';
import { CoreModule } from '../../core/core.module';
import { dispatchEvent } from '../../../testing/testing-helper';

describe('QuestionPageComponent', () => {
  let component: QuestionPageComponent;
  let fixture: ComponentFixture<QuestionPageComponent>;
  let route: ActivatedRouteStub;
  let router: RouterStub;
  let applymentService: ApplymentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ApplymentModule, CoreModule],
        providers: [
          { provide: ActivatedRoute, useFactory: () => new ActivatedRouteStub() },
          { provide: Router, useClass: RouterStub },
          { provide: AssessmentService, useClass: AssessmentServiceStub },
        ]
      })
      .compileComponents();

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    applymentService = fixture.debugElement.injector.get(ApplymentService);

    route.testParams = { uuid: '1', question_id: '1' };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a question and its answers', () => {
    let questionEl = fixture.debugElement.query(By.css('[question]')).nativeElement;
    fixture.detectChanges();
    expect(questionEl.innerHTML).toEqual('Wow, courage!Lord, ye cold jack- set sails for adventure! Dozens of anomalies will be lost in plasmas like attitudes in alarms');
    expect(fixture.debugElement.queryAll(By.css('qp-answer')).length).toEqual(5);
  });

  it('should update the checkedAnswer answer when `onClicked` is fired', async(() => {
    component.updateChecked(1);
    fixture.whenStable();
    expect(component.checkedAnswer).toEqual(1);
  }));

  it('should store the answer in the data store service', () => {
    spyOn(applymentService, 'setAnswer');
    route.testParams = { uuid: '1', question_id: 1 };
    component.updateChecked(1);
    expect(applymentService.setAnswer).toHaveBeenCalledWith(0, 1);
  });

  it('should load and display the answer when already set', () => {
    applymentService.setAnswer(0, 1);
    route.testParams = { uuid: '1', question_id: 1 };
    expect(component.checkedAnswer).toEqual(1);
  });

  describe('navigation buttons', () => {
    it('should navigate to the next question when clicked', async(() => {
      route.testParams = { uuid: '1', question_id: 1 };
      spyOn(router, 'navigate');
      dispatchEvent(fixture, '[next]', 'click');

      expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'questao', 2]);
    }));

    it('should navigate to review page when the current question is the last', async(() => {
      route.testParams = { uuid: '1', question_id: 2 };

      spyOn(router, 'navigate');
      dispatchEvent(fixture, '[next]', 'click');
      expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'revisao']);
    }));

    it('should navigate to the previous question when previous is clicked', async(() => {
      route.testParams = { uuid: '1', question_id: 2 };

      spyOn(router, 'navigate');
      dispatchEvent(fixture, '[prev]', 'click');

      expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'questao', 1]);
    }));

    it('should disable the prev-button when the current question is the first', () => {
      route.testParams = { uuid: 1, question_id: 1 };
      fixture.detectChanges();

      let buttonEl = fixture.debugElement.query(By.css('[prev]')).nativeElement;

      expect(buttonEl.disabled).toEqual(true);
    });
  });
});

