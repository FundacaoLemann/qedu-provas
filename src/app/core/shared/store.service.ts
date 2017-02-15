import { Injectable } from '@angular/core';
import { Student } from '../../shared/model/student';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StoreService {
  private _student$: BehaviorSubject<Student>;
  private _answers$: BehaviorSubject<Array<any>>;

  private _store$: BehaviorSubject<{}>;
  public store;

  constructor() {
    this._student$ = new BehaviorSubject(null);

    this._answers$ = new BehaviorSubject([]);

    this._store$ = new BehaviorSubject({});
    this.store = this._store$.asObservable();
  }

  // Students
  setStudent(student: Student) {
    const newStudent = Object.assign({}, this._student$.getValue(), student);
    this._student$.next(newStudent);
  }

  getStudent(): Student {
    return this._student$.getValue();
  }

  get student(): Observable<Student> {
    return this._student$.asObservable();
  }

  // Answers
  getAnswers(): number[] {
    return this._answers$.getValue();
  }

  setAnswers(answers: number[]) {
    const newAnswers = Object.assign([], this._answers$.getValue(), answers);
    this._answers$.next(newAnswers);
  }

  get answers(): Observable<number[]> {
    return this._answers$.asObservable();
  }

  setValue(branch: string, value: {}) {
    const _value = {};
    _value[branch] = value;
    this._store$.next(Object.assign({}, this._store$.getValue(), _value));
  }

  getValue(branch?: string): any {
    const state = this._store$.getValue();

    if ( branch ) {
      return (state[branch]) ? state[branch] : null;
    } else {
      return state;
    }
  }
}


