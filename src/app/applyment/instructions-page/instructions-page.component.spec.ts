import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { ApplymentService } from '../../core/shared/applyment.service';

const db = require('../../../../mock/db.json');

describe('InstructionsPageComponent', () => {
  let component: InstructionsPageComponent;
  let fixture: ComponentFixture<InstructionsPageComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let assessmentService: AssessmentServiceStub;
  let applyment: ApplymentService;
  const mockAssessment = json.camelizeObject(db.assessments[0]);

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
    applyment = fixture.debugElement.injector.get(ApplymentService);

    spyOn(assessmentService, 'getAssessment').and.returnValue(Observable.of(mockAssessment));

    route.testParams = { uuid: '1' };
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(applyment).toBeDefined();
    expect(component).toBeTruthy();
  }));

  it('should display an assessment details', () => {
    const instructionEl = fixture.debugElement.query(By.css('.instructions')).nativeElement;
    expect(instructionEl.innerHTML).toEqual(mockAssessment.instructions);

    const durationEl = fixture.debugElement.query(By.css('.duration')).nativeElement;
    expect(durationEl.textContent).toEqual(`${mockAssessment.duration} minutos`);

    const itemsCountEl = fixture.debugElement.query(By.css('.items_count')).nativeElement;
    expect(itemsCountEl.textContent).toEqual(`${mockAssessment.itemsCount} questões`);
  });

  it('should open modal when click on start', () => {
    dispatchEvent(fixture, 'button.continue', 'click');
    fixture.detectChanges();

    expect(component.modalRef).toBeTruthy();
  });

  it('initAssessment', async(() => {
    spyOn(applyment, 'initAnswers');
    spyOn(router, 'navigate');

    component.initAssessment();

    expect(applyment.initAnswers).toHaveBeenCalledWith(mockAssessment.itemsCount);
    expect(router.navigate).toHaveBeenCalledWith(['prova', mockAssessment.id.toString(), 'questao', '1']);
  }));

});
