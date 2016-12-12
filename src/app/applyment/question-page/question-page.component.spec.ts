/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionPageComponent } from './question-page.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { RouterStub } from '../../../testing/router-stub';
import { ApplymentModule } from '../applyment.module';
import { StoreService } from '../../core/shared/store.service';
import { AssessmentService } from '../../core/shared/assessment.service';
import { AssessmentServiceStub } from '../../../testing/assessment-service-stub';
import { dispatchEvent } from '../../../testing/form-helper';

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
          { provide: AssessmentService, useClass: AssessmentServiceStub },
          StoreService,
        ]
      })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    store = fixture.debugElement.injector.get(StoreService);

    route.testParams = { uuid: '1', question_id: 1 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a question and its answers', () => {
    let questionEl = fixture.debugElement.query(By.css('[question]')).nativeElement;
    expect(questionEl.textContent).toEqual('If you fly or sit with a great truth, silence absorbs you.');
    expect(fixture.debugElement.queryAll(By.css('qp-answer')).length).toEqual(5);
  });

  it('should update the checked answer when `onClicked` is fired', async(() => {
    component.updateChecked(1);
    fixture.whenStable();
    expect(component.checked).toEqual(1);
  }));

  it('should store the answer in the data store service', () => {
    spyOn(store, 'setAnswer');
    component.updateChecked(1);
    expect(store.setAnswer).toHaveBeenCalledWith(1, 1);
  });

  it('should navigate to the next question', async(() => {
    spyOn(component, 'nextQuestion');
    spyOn(router, 'navigate');

    dispatchEvent(fixture, '[next]', 'click');

    expect(component.nextQuestion).toHaveBeenCalled();
  }));

});

