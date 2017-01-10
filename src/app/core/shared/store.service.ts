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

  private _storeSubject: BehaviorSubject<{}>;
  public store;

  constructor () {
    this._studentSubject = new BehaviorSubject({ name: '', register_number: '' });
    this._student = this._studentSubject.asObservable();

    this._answersSubject = new BehaviorSubject([]);
    this._answers = this._answersSubject.asObservable();

    this._storeSubject = new BehaviorSubject({});
    this.store = this._storeSubject.asObservable();
  }

  setStudent (student: Student) {
    this._studentSubject.next(student);
  }

  get student (): Observable<Student> {
    return this._student;
  }

  setValue (branch: string, value: {}) {
    let _value = {};
    _value[branch] = value;
    this._storeSubject.next(Object.assign({}, this._storeSubject.getValue(), _value));
  }

  getValue (branch?: string): any {
    let state = this._storeSubject.getValue();

    if( branch) {
      return (state[branch]) ? state[branch] : null;
    } else {
      return state;
    }
  }
}


