/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CurrentQuestionComponent } from './current-question.component';
import { ApplymentModule } from '../../applyment.module';

describe('CurrentQuestionComponent', () => {
  let component: CurrentQuestionComponent;
  let fixture: ComponentFixture<CurrentQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApplymentModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display `12 de 20`', () => {
    component.currentQuestion = 12;
    component.questionsLength = 20;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.current-currentItem')).nativeElement.textContent.trim()).toEqual('12 de 20');
  });
});
