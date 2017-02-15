import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionPageComponent } from './question-page.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { RouterStub } from '../../../testing/router-stub';
import { ApplymentModule } from '../applyment.module';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ApplymentService } from '../../core/shared/applyment.service';
import { CoreModule } from '../../core/core.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { dispatchEvent } from '../../../testing/testing-helper';
import * as json from '../../utils/json';
const db = require('../../../../mock/db.json');

describe('QuestionPageComponent', () => {
  let component: QuestionPageComponent;
  let fixture: ComponentFixture<QuestionPageComponent>;
  let route: ActivatedRouteStub;
  let router: RouterStub;
  let applymentService: ApplymentService;
  let assessmentService: AssessmentService;
  const mockQuestions = json.camelizeObject(db.questions);
  const mockAssessment = json.camelizeObject(db.assessments)[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApplymentModule, CoreModule],
      providers: [
        { provide: ActivatedRoute, useFactory: () => new ActivatedRouteStub({ uuid: '1', question_id: '1' }) },
        { provide: Router, useClass: RouterStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    assessmentService = fixture.debugElement.injector.get(AssessmentService);
    applymentService = fixture.debugElement.injector.get(ApplymentService);

    route.testParams = { uuid: '1', question_id: '1' };

    spyOn(assessmentService, 'getQuestions').and.returnValue(Observable.of(mockQuestions));
    spyOn(assessmentService, 'getAssessment').and.returnValue(Observable.of(mockAssessment));
    applymentService.initAnswers(mockQuestions.length);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a question', async(() => {
    route.testParams = { uuid: '1', question_id: '2' };
    fixture.detectChanges();

    const questionEl = fixture.debugElement.query(By.css('[question]')).nativeElement;
    expect(questionEl.innerHTML).toEqual(mockQuestions[1].text);
    expect(fixture.debugElement.queryAll(By.css('qp-answer')).length).toEqual(4);
  }));

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

  it('should display the assessment title being applied', () => {
    route.testParams = { uuid: '1', question_id: '1' };
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('[mainTitle]'));
    expect(title.nativeElement.textContent.trim()).toEqual(mockAssessment.mainTitle);
  });

  describe('navigation buttons', () => {
    it('should navigate to the next question when clicked', async(() => {
      route.testParams = { uuid: '1', question_id: 1 };
      spyOn(router, 'navigate');
      dispatchEvent(fixture, '[next]', 'click');

      expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'questao', 2]);
    }));

    it('should navigate to review page when the current question is the last', async(() => {
      route.testParams = { uuid: '1', question_id: '10' };

      spyOn(router, 'navigate');
      dispatchEvent(fixture, '[next]', 'click');

      expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'revisao']);
    }));

    it('should navigate to the previous question when previous is clicked', async(() => {
      route.testParams = { uuid: '1', question_id: '9' };

      spyOn(router, 'navigate');
      dispatchEvent(fixture, '[prev]', 'click');

      expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'questao', 8]);
    }));

    it('should disable the prev-button when the current question is the first', () => {
      fixture.detectChanges();
      const buttonEl = fixture.debugElement.query(By.css('[prev]')).nativeElement;
      expect(buttonEl.disabled).toEqual(true);
    });
  });
});

