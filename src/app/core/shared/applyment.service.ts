import { Injectable } from '@angular/core';
import { Student } from '../../shared/model/student';
import { StoreService } from './store.service';
import { Observable } from 'rxjs/Observable';

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
    const newState = Object.assign({}, this._store.state, { applyment: { student } });
    this._store.setState(newState);
  }

  student(): Student {
    return this._store.state.applyment.student;
  }

  // OLD

  setAnswer (questionId: number, answerId: number) {
    const answers = this._store.getAnswers();
    answers[questionId] = answerId;

    this._store.setAnswers(answers);
  }

  initAnswers (length: number) {
    const initialAnswers = Array(length).fill(0);
    this._store.setAnswers(initialAnswers);
  }

  getAnswer (questionId: number): number {
    const answers = this._store.getAnswers();
    return answers[questionId];
  }

  getAnswers (): Array<number> {
    return this._store.getAnswers();
  }

  getAnswersAsObservable (): Observable<number[]> {
    return this._store.answers;
  }

}
