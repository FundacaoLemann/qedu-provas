import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionViewComponent } from './question-view.component';
import { ItemModule } from '../item.module';
import { By } from '@angular/platform-browser';
import { detectChanges } from '@angular/core/src/render3';

describe('QuestionViewComponent', () => {
  let component: QuestionViewComponent;
  let fixture: ComponentFixture<QuestionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ItemModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders title', () => {
    component.title = 'Some Assessment being run';
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('[title]'));
    expect(title.nativeElement.textContent).toEqual('Some Assessment being run');
  });

  it('renders index', () => {
    component.index = 10;
    fixture.detectChanges();

    const index = fixture.debugElement.query(By.css('[index]'));
    expect(index.nativeElement.textContent).toEqual('Questão #10');
  });

  it('renders stem', () => {
    component.question = {
      id: '1',
      text: 'Here goes some <b>content</b>',
      answers: [],
      media: [],
    };
    fixture.detectChanges();

    const stem = fixture.debugElement.query(By.css('[stem]'));

    expect(stem.nativeElement.innerHTML).toEqual(
      'Here goes some <b>content</b>',
    );
  });

  it('render answers', () => {
    component.question = {
      id: '1',
      text: 'Here goes some <b>content</b>',
      answers: [{ id: 1, text: 'A' }, { id: 2, text: 'B' }],
      media: [],
    };
    fixture.detectChanges();

    const answersDE = fixture.debugElement.queryAll(By.css('qp-answer'));

    expect(answersDE.length).toEqual(2);
  });

  it('sets new answer and raises', () => {
    component.question = {
      id: '1',
      text: 'Here goes some <b>content</b>',
      answers: [{ id: 1, text: 'A' }, { id: 2, text: 'B' }],
      media: [],
    };

    fixture.detectChanges();

    component.selectAnswer.subscribe(answer => {
      expect(component.answer).toEqual(1);
      expect(answer).toEqual(1);
    });

    component.handleOptionClick(1);
  });
});
