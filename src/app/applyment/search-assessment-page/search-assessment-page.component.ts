import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from '../../core/shared/assessment.service';
import { Assessment } from '../../shared/model/assessment';
import { ApplymentService } from '../shared/applyment.service';
import {MaskDirective} from "../../shared/directives/mask.directive";

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
    this._applymentService.resetInitialState();
  }

  fillAssessmentAndNavigate (assessment: Assessment) {
    this._applymentService.setAssessment(assessment);
    this._router.navigate(['prova', assessment.token]);
  }

  setFormError (error: string) {
    this.formError = error;
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
