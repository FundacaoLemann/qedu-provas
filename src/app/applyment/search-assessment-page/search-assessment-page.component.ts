import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from '../../core/shared/assessment.service';
import { Assessment } from '../../shared/model/assessment';
import { ApplymentService } from '../shared/applyment.service';
import APIError from '../../shared/model/api-error';

@Component({
  selector: 'qp-search-assessment-page',
  templateUrl: 'search-assessment-page.component.html',
  styleUrls: ['search-assessment-page.component.sass']
})
export class SearchAssessmentPageComponent implements OnInit {
  assessmentToken = '';
  formError = '';

  constructor (private _router: Router,
               private _assessmentService: AssessmentService,
               private _applymentService: ApplymentService) {}

  ngOnInit () {
  }

  fillAssessmentAndNavigate (assessment: Assessment) {
    this._applymentService.setAssessment(assessment);
    this._router.navigate(['prova', assessment.token]);
  }

  setFormError (error: APIError) {
    this.formError = error.message;
  }

  validateAndRequestAssessment () {
    if ( this.assessmentToken.length ) {
        this._assessmentService
          .fetchAssessment(this.assessmentToken)
          .subscribe(
            this.fillAssessmentAndNavigate.bind(this),
            this.setFormError.bind(this)
          );
    }
  }
}
