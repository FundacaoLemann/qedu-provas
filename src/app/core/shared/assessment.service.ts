import { Injectable } from '@angular/core';
import { BaseRequestOptions, Headers, Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';
import * as md5 from 'md5';

import { environment } from '../../../environments/environment';
import Answer from '../../shared/model/answer';
import { Assessment } from '../../shared/model/assessment';
import { Item } from '../../shared/model/item';
import { RequestService } from './request.service';

const { API_URL, DOWNLOAD_CODE } = environment;

@Injectable()
export class AssessmentService extends RequestService {

  private extractQuestionData(response: any): Item[] {
    const rawItems = response.items;
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

      const regex = /<img.+?src=[\"'](.+?)[\"'].*?>/igm;
      let match;
      while (match = regex.exec(item.stem)) {
        medias.push({
          id: md5(match[1]),
          type: 'image',
          source: match[1]
        });
      }

      question.answers = answers;
      question.media = medias;

      questions.push(question);
    }

    return questions;
  }

  constructor(private _http: HttpClient) {
    super();
  }

  fetchAssessment(assessment_id: string): Observable<Assessment> {
    return this._http
      .get<{data: Assessment}>(`${API_URL}/assessments/${assessment_id}`)
      .map((response) => response.data)
      .catch(this.handleError);
  }

  fetchAssessmentQuestions(assessmentToken: string, studentToken: string): Observable<Item[]> {
    const url = `${API_URL}/assessments/${assessmentToken}/items`;
    const headers = new HttpHeaders({
      'Authorization': studentToken
    });

    return this._http
      .get(url, { headers })
      .map((response: any) => this.extractQuestionData(response.data))
      .catch(this.handleError);
  }

  postAnswers(assessmentToken: string, studentToken: string, answers: Answer[]): Observable<null> {
    const url = `${API_URL}/assessments/${assessmentToken}/answers`;
    const headers = new HttpHeaders({
      'Authorization': studentToken,
    });

    return this._http
      .post(url, { answers }, { headers })
      .timeout(60000)
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
