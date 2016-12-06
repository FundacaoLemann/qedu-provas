import { Injectable } from '@angular/core';
import { Student } from '../../shared/model/student';

@Injectable()
export class ApplymentService {
  private _student: Student;
  private _answers: {[key: number]: number};
  private _startTime: Date;
  private _finishTime: Date;

  constructor () {
    this._student = new Student();
  }

  start (): void {
    this._startTime = new Date();
  }

  get startTime (): Date {
    return this._startTime;
  }

  finish(): void {
    this._finishTime = new Date();
  }

  get finishTime(): Date {
    return this._finishTime;
  }

  setAnswer(question_id: number, answer_id: number): void {
    this._answers[question_id] = answer_id;
  }


}
