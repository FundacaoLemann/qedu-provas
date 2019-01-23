import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
// App
import { RouterStub } from '../../../../testing/router-stub';
import { InstructionsPageComponent } from './instructions-page.component';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { AssessmentService } from '../../../core/assessment.service';
import { dispatchEvent } from '../../../../testing/testing-helper';
import { ApplymentModule } from '../../applyment.module';
import { ApplymentService } from '../../shared/applyment.service';
import { InstructionsModalComponent } from './modal/instructions-modal.component';
import { ConnectionService } from '../../../shared/services/connection.service';
import { NoConnectionModalComponent } from '../../shared/no-connection-modal/no-connection-modal.component';

const db = require('../../../../../mock/db.json');
const PARSED_STUDENT = {
  id: '12345',
  token: '12a11',
  name: 'John Doe',
  matricula: '12355',
  class: '128hA',
};

describe('InstructionsPageComponent', () => {
  let component: InstructionsPageComponent;
  let fixture: ComponentFixture<InstructionsPageComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let assessmentService: AssessmentService;
  let applymentService: ApplymentService;
  let applyment: ApplymentService;
  let connection: ConnectionService;
  const ASSESSMENT = db.assessments[0];
  const QUESTIONS = db.questions;
  const ITEMS = db.items;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApplymentModule],
      providers: [
        { provide: Router, useValue: new RouterStub() },
        {
          provide: ActivatedRoute,
          useFactory: () => new ActivatedRouteStub({ token: ASSESSMENT.token }),
        },
        AssessmentService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute) as any;
    assessmentService = fixture.debugElement.injector.get(AssessmentService);
    applymentService = fixture.debugElement.injector.get(ApplymentService);
    applyment = fixture.debugElement.injector.get(ApplymentService);
    connection = fixture.debugElement.injector.get(ConnectionService);

    spyOn(applymentService, 'getAssessment').and.returnValue(ASSESSMENT);
    spyOn(assessmentService, 'fetchAssessmentQuestions').and.returnValue(
      of(ITEMS),
    );

    fixture.detectChanges();
  });

  it('should create', (() => {
    expect(applyment).toBeDefined();
    expect(component).toBeTruthy();
  }));

  it('should display an assessment details', () => {
    const instructionEl = fixture.debugElement.query(By.css('.instructions'))
      .nativeElement;
    const durationEl = fixture.debugElement.query(By.css('.duration'))
      .nativeElement;
    const itemsCountEl = fixture.debugElement.query(By.css('.items_count'))
      .nativeElement;
    expect(instructionEl.innerHTML.substr(0, 10)).toEqual(
      ASSESSMENT.instructions.substr(0, 10),
    );
    expect(durationEl.textContent.trim()).toEqual(
      `${ASSESSMENT.duration} minutos`,
    );
    expect(itemsCountEl.textContent.trim()).toEqual(
      `${ASSESSMENT.numberOfItems} questões`,
    );
  });

  it('initAssessment', (() => {
    spyOn(applyment, 'initAnswers');
    spyOn(router, 'navigate');
    // spyOn(assessmentService, 'fetchAssessmentQuestions').and.returnValue(Observable.of(ITEMS));

    applymentService.setStudent(PARSED_STUDENT);
    applymentService.setAssessment(ASSESSMENT);
    component.initAssessment();

    expect(router.navigate).toHaveBeenCalledWith([
      'prova',
      ASSESSMENT.token,
      'questao',
      '1',
    ]);
  }));

  describe('modals', () => {
    it('should open confirmation modal when click on start', () => {
      dispatchEvent(fixture, 'button.continue', 'click');
      fixture.detectChanges();

      expect(component.modalRef.instance).toEqual(
        jasmine.any(InstructionsModalComponent),
      );
    });

    it(
      'should open warning modal when have no connection',
      fakeAsync(() => {
        component.openModalConnectionError();
        tick(300);
        fixture.detectChanges();
        expect(component.modalRef.instance).toEqual(
          jasmine.any(NoConnectionModalComponent),
        );
      }),
    );
  });
});
