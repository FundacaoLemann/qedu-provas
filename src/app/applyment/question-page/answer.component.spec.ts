import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnswerComponent } from './answer.component';
import { dispatchEvent } from '../../../testing/testing-helper';

describe('AnswerComponent', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;
  const option = {
    'id': 1,
    'text': 'Cum lumen assimilant, omnes rationees tractare fortis, neuter urbses.'
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [AnswerComponent]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    component.option = option;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClick event', () => {
    it('should emit `onClicked` event when clicked', (done) => {
      component
        .onClicked
        .subscribe(answerSub => {
          expect(answerSub).toEqual(option);
          done();
        });
      dispatchEvent(fixture, '.answer', 'click');
    });

    it('should set checkedAnswer to the input element', () => {
      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      dispatchEvent(fixture, '.answer', 'click');
      fixture.detectChanges();
      expect(inputEl.checked).toBe(true);
    });
  });

  describe('display content', () => {
    it('should display the question text', () => {
      const labelEl = fixture.debugElement.query(By.css('label')).nativeElement;
      expect(labelEl.textContent).toEqual(option.text);
    });
  });

});
