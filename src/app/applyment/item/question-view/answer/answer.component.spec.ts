import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnswerComponent } from './answer.component';
import Mock from '../../../../../../mock/mock';

describe('AnswerComponent', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;
  const OPTION = Mock.mockOptions()[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    component.option = OPTION;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClick event', () => {
    it('should emit `onClicked` event when clicked', async(() => {
      component.onClicked.subscribe(optionId => {
        expect(optionId).toEqual(OPTION.id);
        expect(component.checked).toEqual(true);
      });

      const optionEl = fixture.debugElement.query(By.css('[option]'))
        .nativeElement;
      optionEl.click();
    }));
  });

  describe('display content', () => {
    it('should display the currentItem text', () => {
      const labelEl = fixture.debugElement.query(By.css('label')).nativeElement;
      expect(labelEl.textContent).toEqual(OPTION.text);
    });
  });
});
