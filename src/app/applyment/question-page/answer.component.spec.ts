/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnswerComponent } from './answer.component';
import { Answer } from '../../shared/model/answer';
import { dispatchEvent } from '../../../testing/form-helper';
import { ASSESSMENTS } from '../../../mocks/assessments-mock';

describe('AnswerComponent', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;
  let answer: Answer;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [AnswerComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    component.answer = answer = ASSESSMENTS[0].questions[0].answers[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClick event', () => {
    it('should emit `onClicked` event when clicked', (done) => {
      component.onClicked.subscribe(answerSub => {
        expect(answerSub).toEqual(answer.id);
        done();
      });
      dispatchEvent(fixture, '.answer', 'click');
    });

    it('should set checked to the input element', () => {
      let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      dispatchEvent(fixture, '.answer', 'click');
      fixture.detectChanges();
      expect(inputEl.checked).toBe(true);
    });
  });

  describe('display content', () => {
    it('should display the question text', () => {
      let labelEl = fixture.debugElement.query(By.css('label')).nativeElement;
      expect(labelEl.textContent).toEqual(answer.text)
    });
  });

});
