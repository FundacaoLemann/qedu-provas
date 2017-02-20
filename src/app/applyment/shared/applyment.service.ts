import { Injectable } from '@angular/core';
import { Student } from '../../shared/model/student';
import { StoreService } from '../../core/shared/store.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class ApplymentService {
  initialState = {
    applyment: {
      assessment: null,
      questions: [],
      answers: [],
      student: null
    }
  };

  constructor(private _store: StoreService) {
    this._store.setState(this.initialState);
  }

  setStudent(student: Student) {
    const newState = _.merge({}, this._store.state, { applyment: { student } });
    this._store.setState(newState);
  }

  getStudent(): Student {
    try {
      return this._store.state.applyment.student;
    } catch (err) {
      return null;
    }
  }

  // Answers
  initAnswers(length: number) {
    const answers = Array(length).fill(0);

    const newState = _.merge({}, this._store.state, { applyment: { answers } });
    this._store.setState(newState);
  }

  setSingleAnswer(questionId: number, answerId: number) {
    const answers = this._store.state.applyment.answers;
    answers[questionId] = answerId;

    const newState = _.merge({}, this._store.state, { applyment: { answers } });
    this._store.setState(newState);
  }

  getSingleAnswer(questionId: number): number {
    return this._store.state.applyment.answers[questionId];
  }

  getAllAnswers(): Array<number> {
    return this._store.state.applyment.answers;
  }

  answersAsObservable(): Observable<number[]> {
    return this._store.asObservable().map(state => {
      return state.applyment.answers;
    });
  }

}
