import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';
import { QuestionPageComponent } from './question-page.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { CoreModule } from '../../core/core.module';
import { ApplymentModule } from '../applyment.module';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { RouterStub } from '../../../testing/router-stub';
import { ApplymentService } from '../shared/applyment.service';
import { StoreService } from '../../core/shared/store.service';
import * as test from '../../../testing/testing-helper';
import { createResponse } from '../../../testing/testing-helper';
import Mock from '../../../../mock/mock';
import { Answer } from '../../shared/model/answer';
import { AnswerManagerService } from './answer-manager.service';
import { Subject } from 'rxjs/Subject';

const db = require('../../../../mock/db.json');

describe('QuestionPageComponent', () => {
  let component: QuestionPageComponent;
  let fixture: ComponentFixture<QuestionPageComponent>;
  let route: ActivatedRouteStub;
  let router: RouterStub;
  let applymentService: ApplymentService;
  let answerManagerService: AnswerManagerService;
  const QUESTIONS = [Mock.mockItem(), Mock.mockItem(1), Mock.mockItem(2)];
  const STUDENT = db.students[0];
  const ASSESSMENT = db.assessments[0];
  const ANSWERS = [Mock.mockAnswer(), Mock.mockAnswer(1), Mock.mockAnswer(2)];


  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ApplymentModule, CoreModule],
        providers: [
          {
            provide: ActivatedRoute,
            useFactory: () =>
              new ActivatedRouteStub({
                token: ASSESSMENT.token,
                question_id: '1',
              }),
          },
          { provide: Router, useClass: RouterStub },
          ApplymentService,
          StoreService,
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute) as any;
    applymentService = fixture.debugElement.injector.get(ApplymentService);
    answerManagerService = fixture.debugElement.injector.get(
      AnswerManagerService,
    );

    spyOn(window, 'scrollTo');

    applymentService.setAssessment(ASSESSMENT);
    applymentService.setItems(QUESTIONS);
    applymentService.setStudent(STUDENT);

    fixture.detectChanges();
  });

  it('renders a question', () => {
    const question = QUESTIONS[0];
    route.testParams = { token: 'prova-1', question_id: '1' };

    const itemIndexContent = fixture.debugElement.query(By.css('[itemIndex]'))
      .nativeElement.textContent;
    const itemStemHtml = fixture.debugElement.query(By.css('[itemStem]'))
      .nativeElement.innerHTML;
    const itemOptions = fixture.debugElement.queryAll(By.css('qp-answer'));

    expect(itemIndexContent).toEqual('Questão #1');
    expect(itemStemHtml).toEqual(question.text);
    expect(itemOptions.length).toEqual(4);
  });

  it('register a question to be managed', () => {
    const mockAnswer = ANSWERS[0];
    spyOn(answerManagerService, 'register');
    spyOn(applymentService, 'getAnswer').and.returnValue(mockAnswer);
    route.testParams = { token: 'prova-1', question_id: '1' };

    expect(answerManagerService.register).toHaveBeenCalledWith(mockAnswer);
  });

  it(
    'updates answer on options change',
    async(() => {
      const mockAnswer = ANSWERS[0];
      const updatedAnswer = new Answer({ ...mockAnswer, optionId: 1 });
      const mockedAnswerManager$ = new Subject();
      spyOn(answerManagerService, 'register').and.returnValue(
        mockedAnswerManager$.asObservable(),
      );
      spyOn(answerManagerService, 'setOption');
      spyOn(applymentService, 'setAnswer');

      route.testParams = { token: 'prova-1', question_id: '1' };

      component.handleOptionClick(1);
      mockedAnswerManager$.next(updatedAnswer);

      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
      expect(answerManagerService.setOption).toHaveBeenCalledWith(1);
      expect(applymentService.setAnswer).toHaveBeenCalledWith(0, updatedAnswer);
    }),
  );

  it('stop tracking on destroy', fakeAsync(() => {
    spyOn(answerManagerService, 'unregister');

    component.ngOnDestroy();

    expect(answerManagerService.unregister).toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigation buttons', () => {
    it(
      'should navigate to the next question when clicked',
      async(() => {
        route.testParams = { token: '1', question_id: 1 };
        spyOn(router, 'navigate');
        test.dispatchEvent(fixture, '[next]', 'click');

        expect(router.navigate).toHaveBeenCalledWith([
          'prova',
          '1',
          'questao',
          2,
        ]);
      }),
    );

    it(
      'should navigate to review page when the current question is the last',
      async(() => {
        route.testParams = { token: 'qedu1', question_id: '10' };
        spyOn(router, 'navigate');
        test.dispatchEvent(fixture, '[next]', 'click');
        expect(router.navigate).toHaveBeenCalledWith([
          'prova',
          'qedu1',
          'revisao',
        ]);
      }),
    );

    it(
      'should navigate to the previous question when previous is clicked',
      async(() => {
        route.testParams = { token: 'qedu1', question_id: '9' };
        spyOn(router, 'navigate');
        test.dispatchEvent(fixture, '[prev]', 'click');
        expect(router.navigate).toHaveBeenCalledWith([
          'prova',
          'qedu1',
          'questao',
          8,
        ]);
      }),
    );

    it('should disable the prev-button when the current question is the first', () => {
      route.testParams = { token: 'qedu1', question_id: '1' };
      fixture.detectChanges();
      const buttonEl = fixture.debugElement.query(By.css('[prev]'))
        .nativeElement;
      expect(buttonEl.disabled).toEqual(true);
    });

    it('should show amount of progression items', () => {
      const progressionItemLength = fixture.debugElement.queryAll(
        By.css('.progression-path-item'),
      ).length;
      const itemLength = applymentService.getItems().length;

      expect(progressionItemLength).toEqual(itemLength);
    });
  });
});
