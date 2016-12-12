import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assessment } from '../../shared/model/assessment';
import { Http, Response } from '@angular/http';
import { Question } from '../../shared/model/question';

const apiUrl = "http://localhost:3000";

@Injectable()
export class AssessmentService {

  constructor(protected http: Http) { }

  getAssessment (assessment_id: string): Observable<Assessment> {
    return this.http.get(`${apiUrl}/assessments/${assessment_id}`)
      .map(resp => resp.json().data as Assessment)
      .catch(this._handleError);
  }

  getQuestions (assessment_id: string): Observable<Question[]> {
    return this.http.get(`${apiUrl}/assessment/${assessment_id}/questions`)
      .map(resp => resp.json().data as Question[])
      .catch(this._handleError);
  }

  private _handleError(error: Response | any) {
    let errorMsg = `${error.status} - ${error.statusText || ''}`;
    return Observable.throw(errorMsg);
  }
}
