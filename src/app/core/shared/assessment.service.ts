import { Injectable } from '@angular/core';
import { BaseRequestOptions, Headers, Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import Answer from '../../shared/model/answer';
import { Assessment } from '../../shared/model/assessment';
import { Item } from '../../shared/model/item';
import { RequestService } from './request.service';

const md5 = require('md5');
const { API_URL, DOWNLOAD_CODE } = environment;

@Injectable()
export class AssessmentService extends RequestService {

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

  constructor(private _http: Http) {
    super();
  }

  fetchAssessment(assessment_id: string): Observable<Assessment> {
    return this._http
               .get(`${API_URL}/assessments/${assessment_id}`)
               .map(AssessmentService.extractData)
               .catch(this.handleError);
  }

  fetchAssessmentQuestions(assessmentToken: string, studentToken: string): Observable<Item[]> {
    const url = `${API_URL}/assessments/${assessmentToken}/items`;
    const headers = new Headers({
      'Authorization': studentToken
    });

    return this._http
               .get(url, { headers })
               .map(AssessmentService.extractQuestionData)
               .catch(this.handleError);
  }

  postAnswers(assessmentToken: string, studentToken: string, answers: Answer[]): Observable<Response> {
    const options = new BaseRequestOptions();
    options.headers = new Headers({
      'Authorization': studentToken,
    });

    const url = `${API_URL}/assessments/${assessmentToken}/answers`;

    return this._http
               .post(url, { answers }, options)
               .timeout(60000)
               .catch(this.handleError);
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
               .catch(this.handleError);
  }

  downloadBackup(password: string): string | boolean {
    if (password === DOWNLOAD_CODE) {
      const anchor = document.createElement('a');
      const content = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(window.localStorage));
      anchor.setAttribute('href', content);
      anchor.setAttribute('download', 'backup.txt');
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      return content;
    } else {
      return false;
    }
  }

}
