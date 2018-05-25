import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class StoreService {

  private _store$ = new BehaviorSubject(null);

  constructor() {
  }

  setState(newState: any) {
    if ( this._store$.getValue() === newState ) {
      throw new Error('Cannot modify an existing state. Please create a new state object.');
    }

    this._store$.next(newState);
  }

  get state() {
    return this._store$.getValue();
  }

  asObservable(): Observable<any> {
    return this._store$
      .asObservable()
      .distinctUntilChanged();
  }

}
