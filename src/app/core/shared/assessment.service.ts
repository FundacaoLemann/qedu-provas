import { Injectable } from '@angular/core';
import { Assessment } from '../../shared/model/assessment';
import { Http, Response } from '@angular/http';
import { Question } from '../../shared/model/question';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { camelizeObject } from '../../utils/json';
import { ApplymentStatus } from '../../shared/model/applyment-status';
import { environment } from '../../../environments/environment';

const { API_URL } = environment;

@Injectable()
export class AssessmentService {

  constructor(private _http: Http) {
  }

  fetchAssessment(assessment_id: string): Observable<Assessment> {
    return this._http
      .get(`${API_URL}/assessments/${assessment_id}`)
      .map(resp => camelizeObject(resp.json()).data)
      .catch(this._handleError);
  }

  fetchAssessmentQuestions(assessment_id: string): Observable<Question[]> {
    return this._http
      .get(`${API_URL}/assessment/${assessment_id}/questions`)
      .map(resp => camelizeObject(resp.json()).data)
      .catch(this._handleError);
  }

  postAssessment(assessment: ApplymentStatus): Observable<{ status: number, statusText: string, message?: string }> {
    return this._http
      .post(`${API_URL}/assessment`, { data: { assessment } })
      .map(response => {
        if ( response.status === 201 ) {
          return {
            status: 201,
            statusText: 'Created'
          };
        } else {
          return {
            status: response.status,
            statusText: response.statusText,
            message: response.json().data
          };
        }
      })
      .catch(this._handleError);
  }

  private _handleError(error: Response | any) {
    const errorMsg = `${error.status} - ${error.statusText || ''}`;
    return Observable.throw(errorMsg);
  }
}
