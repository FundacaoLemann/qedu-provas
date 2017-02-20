import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StoreService {
  private _answers$: BehaviorSubject<Array<any>>;

  private _store$ = new BehaviorSubject(null);

  constructor() {
    this._answers$ = new BehaviorSubject([]);
  }

  setState(newState: any) {
    this._store$.next(newState);
  }

  get state() {
    return this._store$.getValue();
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


