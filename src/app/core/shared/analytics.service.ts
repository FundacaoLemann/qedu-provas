import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

@Injectable()
export class AnalyticsService {
  constructor(private _angulartics2: Angulartics2) {}

  setStudentToken(studentToken: string) {
    window.localStorage.setItem('studentToken', studentToken);
  }

  eventTrack(assessmentToken: string, studentToken: string, questionNumber: number, initialTime: number) {
    const options: any = {
      action: `Stundent: ${studentToken}, Assessment: ${assessmentToken}`,
      properties: {
        category: `Question Number :${this.normalizeQuestion(questionNumber)}`,
        label: `Time: ${this.timeDiff(initialTime)}`
      }
    };
    this._angulartics2.eventTrack.next(options);
  }

  normalizeQuestion(questionNumber: number) {
    return questionNumber + 1;
  }

  timeDiff(initialTime: any) {
    const timeInSeconds: number = Math.floor((new Date().getTime() - initialTime) / 1000);
    let hours: any = Math.floor(timeInSeconds / 3600);
    let minutes: any = Math.floor((timeInSeconds - (hours * 3600)) / 60);
    let seconds: any = timeInSeconds - (hours * 3600) - (minutes * 60);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
  }
}
