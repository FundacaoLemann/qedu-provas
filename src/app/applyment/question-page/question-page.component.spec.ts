/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionPageComponent } from './question-page.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { RouterStub } from '../../../testing/router-stub';
import { ApplymentModule } from '../applyment.module';
import { dispatchEvent } from '../../../testing/form-helper';
import { ASSESSMENTS } from '../../../mocks/assessments-mock';
import { StoreService } from '../../core/shared/store.service';

describe('QuestionPageComponent', () => {
  let component: QuestionPageComponent;
  let fixture: ComponentFixture<QuestionPageComponent>;
  let route: ActivatedRouteStub;
  let router: RouterStub;
  let store: StoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ApplymentModule],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
          { provide: Router, useClass: RouterStub },
          StoreService
        ]
      })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPageComponent);
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    store = fixture.debugElement.injector.get(StoreService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a question and its answers', () => {
    let question = ASSESSMENTS[0].questions[0];

    let questionEl = fixture.debugElement.query(By.css('[question]')).nativeElement;
    expect(questionEl.textContent).toEqual(question.text);
    expect(fixture.debugElement.queryAll(By.css('qp-answer')).length).toEqual(5);
  });

  it('should update the checked answer when `onClicked` is fired', async(() => {
    let answer = ASSESSMENTS[0].questions[0].answers[0];
    component.updateChecked(answer.id);
    fixture.whenStable();
    expect(component.checked).toEqual(answer.id);
  }));

  it('should store the answer in the data store service', () => {
    spyOn(store, 'setAnswer');
    let question = ASSESSMENTS[0].questions[0];
    component.question = question;
    component.updateChecked(question.answers[1].id);
    expect(store.setAnswer).toHaveBeenCalledWith(question.id, question.answers[1].id);
  });

  it('should navigate to the next question', async(() => {
    route.testParams = { uuid: '1', question_id: 1 };
    spyOn(component, 'nextQuestion');
    spyOn(router, 'navigate');

    dispatchEvent(fixture, '[next]', 'click');

    expect(component.nextQuestion).toHaveBeenCalled();
  }));

});

