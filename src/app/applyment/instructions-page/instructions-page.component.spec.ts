import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
// App
import { RouterStub } from '../../../testing/router-stub';
import { InstructionsPageComponent } from './instructions-page.component';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { AssessmentService } from '../../core/shared/assessment.service';
import { AssessmentServiceStub } from '../../../testing/assessment-service-stub';
import { dispatchEvent } from '../../../testing/testing-helper';
import { ApplymentModule } from '../applyment.module';
import json from '../../utils/json';
import { ApplymentService } from '../shared/applyment.service';
import { InstructionsModalComponent } from './modal/instructions-modal.component';
import { ConnectionService } from '../../core/shared/connection.service';
import { NoConnectionModalComponent } from '../shared/no-connection-modal/no-connection-modal.component';

const db = require('../../../../mock/db.json');

describe('InstructionsPageComponent', () => {
  let component: InstructionsPageComponent;
  let fixture: ComponentFixture<InstructionsPageComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let assessmentService: AssessmentServiceStub;
  let applymentService: ApplymentService;
  let applyment: ApplymentService;
  let connection: ConnectionService;
  const ASSESSMENT = json.camelizeObject(db.assessments[0]);
  const QUESTIONS = db.questions;

  beforeEach(async(() => {
    const routeStub = new ActivatedRouteStub();
    routeStub.testParams = { uuid: '1' };
    TestBed.configureTestingModule({
      imports: [
        ApplymentModule
      ],
      providers: [
        { provide: Router, useValue: new RouterStub() },
        { provide: ActivatedRoute, useValue: routeStub },
        AssessmentService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    assessmentService = fixture.debugElement.injector.get(AssessmentService);
    applymentService = fixture.debugElement.injector.get(ApplymentService);
    applyment = fixture.debugElement.injector.get(ApplymentService);
    connection = fixture.debugElement.injector.get(ConnectionService);

    spyOn(applymentService, 'getAssessment').and.returnValue(ASSESSMENT);
    spyOn(assessmentService, 'fetchAssessmentQuestions').and.returnValue(Observable.of(QUESTIONS));

    route.testParams = { token: '1' };
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(applyment).toBeDefined();
    expect(component).toBeTruthy();
  }));

  it('should display an assessment details', () => {
    const instructionEl = fixture.debugElement.query(By.css('.instructions')).nativeElement;
    expect(instructionEl.innerHTML).toEqual(ASSESSMENT.instructions);

    const durationEl = fixture.debugElement.query(By.css('.duration')).nativeElement;
    expect(durationEl.textContent).toEqual(`${ASSESSMENT.duration} minutos`);

    const itemsCountEl = fixture.debugElement.query(By.css('.items_count')).nativeElement;
    expect(itemsCountEl.textContent).toEqual(`${ASSESSMENT.itemsCount} questões`);
  });


  it('initAssessment', async(() => {
    spyOn(applyment, 'initAnswers');
    spyOn(router, 'navigate');

    applymentService.setAssessment(ASSESSMENT);
    component.initAssessment();

    expect(applyment.initAnswers).toHaveBeenCalledWith(ASSESSMENT.itemsCount);
    expect(router.navigate).toHaveBeenCalledWith(['prova', ASSESSMENT.id.toString(), 'questao', '1']);
  }));

  describe('modals', () => {
    it('should open confirmation modal when click on start', () => {
      dispatchEvent(fixture, 'button.continue', 'click');
      fixture.detectChanges();

      expect(component.modalRef.instance).toEqual(jasmine.any(InstructionsModalComponent));
    });

    it('should open warning modal when have no connection', fakeAsync(() => {
      component.openModalConnectionError();
      tick(300);
      fixture.detectChanges();
      expect(component.modalRef.instance).toEqual(jasmine.any(NoConnectionModalComponent));
    }));
  });

});
