import { Injectable } from '@angular/core';
import { Student } from '../../shared/model/student';
import { Observable, BehaviorSubject } from 'rxjs';
import { AnswerStore } from './model/answer-store';

@Injectable()
export class StoreService {
  private _studentSubject: BehaviorSubject<Student>;
  private _student: Observable<Student>;
  private _answers: Observable<AnswerStore[]>;
  private _answersSubject: BehaviorSubject<AnswerStore[]>;

  constructor () {
    this._studentSubject = new BehaviorSubject({ name: '', register_number: '' });
    this._student = this._studentSubject.asObservable();

    this._answersSubject = new BehaviorSubject([]);
    this._answers = this._answersSubject.asObservable();
  }

  setStudent (student: Student) {
    this._studentSubject.next(student);
  }

  getStudentValue (): Student {
    return this._studentSubject.getValue();
  }

  get student (): Observable<Student> {
    return this._student;
  }

  setAnswer (question_id: number, answer_id: number) {
    let updateAnswer = new AnswerStore(question_id, answer_id);
    let currentAnswers = this.getAnswers();

    let foundAnswer;
    let index = 0;
    for ( index; index < currentAnswers.length; index++ ) {
      if ( currentAnswers[index].question_id === question_id ) {
        foundAnswer = currentAnswers[index];
        break;
      }
    }

    if ( !foundAnswer ) {
      currentAnswers.push(updateAnswer);
    }
    else {
      currentAnswers[index] = updateAnswer;
    }

    this._answersSubject.next(currentAnswers);
  }

  getAnswers (): AnswerStore[] {
    return this._answersSubject.getValue();
  }

  get answers (): Observable<AnswerStore[]> {
    return this._answers;
  }
}
