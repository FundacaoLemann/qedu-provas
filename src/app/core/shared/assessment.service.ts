import { Injectable } from '@angular/core';
import { Assessment } from '../../shared/model/assessment';
import { Http, Response, Headers, BaseRequestOptions } from '@angular/http';
import { Item } from '../../shared/model/item';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ApplymentStatus } from '../../shared/model/applyment-status';
import { environment } from '../../../environments/environment';
import AnswerPost from '../../shared/model/answer-post';
import Answer from '../../shared/model/answer';

const md5 = require('md5');
const { API_URL } = environment;

@Injectable()
export class AssessmentService {

  static extractData(response: Response): any {
    return response.json().data;
  }

  static extractQuestionData(response: Response): Item[] {
    const rawItems = response.json().data.items;
    const questions = [];

    for (const item of rawItems) {
      const question = {
        id: item.id,
        text: item.stem,
        answers: [],
        media: []
      };

      const answers = [];
      for (const option of item.options) {
        const answer = {
          id: option.id,
          text: option.description
        };
        answers.push(answer);
      }

      const medias = [];
      if (item.image) {
        const media = {
          id: md5(item.image),
          type: 'image',
          source: item.image
        };
        question.text += ` {{${media.id}}}`;
        medias.push(media);
      }

      question.answers = answers;
      question.media = medias;

      questions.push(question);
    }

    return questions;
  }

  static handleError(error: Response | any) {
    let errorMessage = '';
    if (error instanceof Response) {
      errorMessage = error.json().message;
    } else {
      errorMessage = error.message || JSON.stringify(error);
    }

    return Observable.throw(errorMessage);
  }

  constructor(private _http: Http) {
  }

  fetchAssessment(assessment_id: string): Observable<Assessment> {
    return this._http
               .get(`${API_URL}/assessments/${assessment_id}`)
               .map(AssessmentService.extractData)
               .catch(AssessmentService.handleError);
  }

  fetchAssessmentQuestions(assessmentToken: string, studentToken: string): Observable<Item[]> {
    const url = `${API_URL}/assessments/${assessmentToken}/items`;
    const headers = new Headers({
      'Authorization': studentToken
    });

    return this._http
               .get(url, { headers })
               .map(AssessmentService.extractQuestionData)
               .catch(AssessmentService.handleError);
  }

  postAssessment(assessment: ApplymentStatus): Observable<{ status: number, statusText: string, message?: string }> {
    return this._http
               .post(`${API_URL}/assessment`, { data: { assessment } })
               .map(response => {
                 if (response.status === 201) {
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
               .catch(AssessmentService.handleError);
  }

  postAnswers(assessmentToken: string, studentToken: string, answers: Answer[]): Observable<Response> {
    const options = new BaseRequestOptions();
    options.headers = new Headers({
      'Authorization': studentToken,
    });

    return this._http
               .post(`${API_URL}/assessments/${assessmentToken}/answers`, answers, options)
               .catch(AssessmentService.handleError);
  }

  finishAssessment(assessmentToken: string, studentToken: string): Observable<string> {
    const url = `${API_URL}/assessments/${assessmentToken}/students`;
    const options = new BaseRequestOptions();
    options.headers = new Headers({
      'Authorization': studentToken
    });
    const body = { finished: true };

    return this._http
               .put(url, body, options)
               .map(response => response.json().message.data)
               .catch(AssessmentService.handleError);
  }

}
