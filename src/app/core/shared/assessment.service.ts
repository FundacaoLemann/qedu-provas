import { Injectable } from '@angular/core';
import { Assessment } from '../../shared/model/assessment';
import { Http, Response } from '@angular/http';
import { Question } from '../../shared/model/question';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ApplymentStatus } from '../../shared/model/applyment-status';
import { environment } from '../../../environments/environment';
import AnswerPost from '../../shared/model/answer-post';

const { API_URL } = environment;

@Injectable()
export class AssessmentService {

  constructor(private _http: Http) {
  }

  fetchAssessment(assessment_id: string): Observable<Assessment> {
    return this._http
               .get(`${API_URL}/assessments/${assessment_id}`)
               .map(this.extractData)
               .catch(this.handleError);
  }

  fetchAssessmentQuestions(assessment_id: string): Observable<Question[]> {
    return this._http
               .get(`${API_URL}/assessment/${assessment_id}/questions`)
               .map(this.extractData)
               .catch(this.handleError);
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
               .catch(this.handleError);
  }

  postAnswer(answer: AnswerPost): Observable<Response> {
    return this._http
               .post(`${API_URL}/assessment/${answer.assessmentToken}/answer`, answer)
               .catch(this.handleError);
  }

  extractData(response: Response): any {
    return response.json().data;
  }

  handleError(error: Response | any) {

    let errorMessage = '';
    if ( error instanceof Response ) {
      errorMessage = error.json().error.message;
    } else {
      errorMessage = error.message || JSON.stringify(error);
    }

    return Observable.throw(errorMessage);
  }
}
