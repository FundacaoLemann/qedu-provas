import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { SearchAssessmentPageComponent } from './search-assessment-page.component';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ApplymentService } from '../shared/applyment.service';
import { ApplymentModule } from '../applyment.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import APIError from '../../shared/model/api-error';
import { By } from '@angular/platform-browser';

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

  fdescribe('onSubmit()', () => {
    it('should not fetch an assessment', () => {
      spyOn(assessmentService, 'fetchAssessment');

      component.onSubmit();
      expect(assessmentService.fetchAssessment).not.toHaveBeenCalled();
    });

    it('should try to fetch an assessment', () => {
      spyOn(assessmentService, 'fetchAssessment')
        .and.returnValue(Observable.of(ASSESSMENT));

      component.assessmentToken = 'qedu1';
      component.onSubmit();

      expect(assessmentService.fetchAssessment).toHaveBeenCalledWith('qedu1');
    });
  });

  fdescribe('onFetchAssessmentSuccess()', () => {
    it('should set the assessment and redirect', () => {
      spyOn(applymentService, 'setAssessment');
      spyOn(router, 'navigate');

      component.onFetchAssessmentSuccess(ASSESSMENT);

      expect(applymentService.setAssessment).toHaveBeenCalledWith(ASSESSMENT);
      expect(router.navigate).toHaveBeenCalledWith(['prova', ASSESSMENT.token]);
    });
  });

  fdescribe('onFetchAssessmentFail()', () => {
    it('should fill form error', () => {
      const error: APIError = {
        code: 404,
        message: 'Prova não encontrada'
      };

      component.onFetchAssessmentFail(error);
      fixture.detectChanges();
      expect(component.formError).toEqual(error.message);

      const errorEl = fixture.debugElement.query(By.css('.error')).nativeElement;
      expect(errorEl.textContent).toEqual(error.message);
    });
  });

});
