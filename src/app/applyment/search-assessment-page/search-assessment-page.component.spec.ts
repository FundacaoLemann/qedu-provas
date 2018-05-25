import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { SearchAssessmentPageComponent } from './search-assessment-page.component';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ApplymentService } from '../shared/applyment.service';
import { ApplymentModule } from '../applyment.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { ResponseError } from '../../shared/errors/response-error';

const db = require('../../../../mock/db.json');
const ASSESSMENT = db.assessments[0];

describe('SearchAssessmentPageComponent', () => {
  let component: SearchAssessmentPageComponent;
  let fixture: ComponentFixture<SearchAssessmentPageComponent>;
  let assessmentService: AssessmentService;
  let applymentService: ApplymentService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             imports: [ApplymentModule, RouterTestingModule],
           })
           .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAssessmentPageComponent);
    component = fixture.componentInstance;
    assessmentService = fixture.debugElement.injector.get(AssessmentService);
    applymentService = fixture.debugElement.injector.get(ApplymentService);
    router = fixture.debugElement.injector.get(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validateAndRequestAssessment()', () => {
    it('should not fetch an assessment', () => {
      spyOn(assessmentService, 'fetchAssessment');

      component.validateAndRequestAssessment();
      expect(assessmentService.fetchAssessment).not.toHaveBeenCalled();
    });

    it('should try to fetch an assessment', () => {
      spyOn(assessmentService, 'fetchAssessment')
        .and.returnValue(Observable.of(ASSESSMENT));
      spyOn(applymentService, 'setAssessment');
      spyOn(router, 'navigate');

      component.assessmentToken = 'qedu1';
      component.validateAndRequestAssessment();

      expect(assessmentService.fetchAssessment).toHaveBeenCalledWith('qedu1');
    });
  });

  describe('fillAssessmentAndNavigate()', () => {
    it('should set the assessment and redirect', () => {
      spyOn(applymentService, 'setAssessment');
      spyOn(router, 'navigate');

      component.fillAssessmentAndNavigate(ASSESSMENT);

      expect(applymentService.setAssessment).toHaveBeenCalledWith(ASSESSMENT);
      expect(router.navigate).toHaveBeenCalledWith(['prova', ASSESSMENT.token]);
    });
  });

  describe('setFormError()', () => {
    it('should fill form errors', () => {
      const message = 'Prova não encontrada';
      const error = new ResponseError(message);

      component.setFormError(error);
      fixture.detectChanges();
      expect(component.formError).toEqual(message);

      const errorEl = fixture.debugElement.query(By.css('.error')).nativeElement;
      expect(errorEl.textContent).toEqual(message);
    });
  });

});
