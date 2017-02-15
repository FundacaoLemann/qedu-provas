import { Injectable } from '@angular/core';
import { Assessment } from '../../shared/model/assessment';
import { Http, Response } from '@angular/http';
import { Question } from '../../shared/model/question';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import jsonFn from '../../utils/json';

const apiUrl = 'http://localhost:3000';

@Injectable()
export class AssessmentService {
  private _assessment: Assessment;
  private _questions: Question[];

  constructor(protected http: Http) {
  }

  getAssessment(assessment_id: string): Observable<Assessment> {
    if ( this._assessment ) {
      return Observable.of(this._assessment);
    }

    return this.http
      .get(`${apiUrl}/assessments/${assessment_id}`)
      .map(resp => this._assessment = jsonFn.camelizeObject(resp.json()).data)
      .catch(this._handleError);
  }

  getQuestions(assessment_id: string): Observable<Question[]> {
    if ( this._questions ) {
      return Observable.of(this._questions);
    }

    return this.http
      .get(`${apiUrl}/assessment/${assessment_id}/questions`)
      .map(resp => this._questions = jsonFn.camelizeObject(resp.json()).data)
      .catch(this._handleError);
  }

  private _handleError(error: Response | any) {
    const errorMsg = `${error.status} - ${error.statusText || ''}`;
    return Observable.throw(errorMsg);
  }
}
