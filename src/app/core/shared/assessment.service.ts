import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assessment } from '../../shared/model/assessment';
import { Http, Response } from '@angular/http';
import { Question } from '../../shared/model/question';
import jsonFn from '../../utils/json';

const apiUrl = "http://localhost:3000";

@Injectable()
export class AssessmentService {

  constructor (protected http: Http) {
  }

  getAssessment (assessment_id: string): Observable<Assessment> {
    return this.http.get(`${apiUrl}/assessments/${assessment_id}`)
      .map(resp => jsonFn.camelizeObject(resp.json()).data)
      .catch(this._handleError);
  }

  getQuestions (assessment_id: string): Observable<Question[]> {
    return this.http.get(`${apiUrl}/assessment/${assessment_id}/questions`)
      .map(resp => jsonFn.camelizeObject(resp.json()).data)
      .catch(this._handleError);
  }

  private _handleError (error: Response | any) {
    let errorMsg = `${error.status} - ${error.statusText || ''}`;
    return Observable.throw(errorMsg);
  }
}
