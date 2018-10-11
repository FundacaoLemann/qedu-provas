import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from '../../../core/assessment.service';
import { Assessment } from '../../../shared/model/assessment';
import { ApplymentService } from '../../shared/applyment.service';

@Component({
  selector: 'qp-search-assessment-page',
  templateUrl: './search-assessment-page.component.html',
  styleUrls: ['./search-assessment-page.component.sass']
})
export class SearchAssessmentPageComponent implements OnInit {
  assessmentToken = '';
  formError = '';
  showLoading = false;

  constructor (private _router: Router,
               private _assessmentService: AssessmentService,
               private _applymentService: ApplymentService) {}

  ngOnInit () {
    this._applymentService.resetInitialState();
  }

  fillAssessmentAndNavigate (assessment: Assessment) {
    this._applymentService.setAssessment(assessment);
    this.showLoading = false;
    this._router.navigate(['prova', assessment.token]);
  }

  setFormError (error: Error) {
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
