import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';

import { ValidationState } from './validation-state.interface';

@Injectable({
  providedIn: 'root',
})
export class ValidationStateService {
  private state$ = new BehaviorSubject<ValidationState>(new ValidationState);
  constructor() {
  }

  get state(): ValidationState {
    return this.state$.getValue();
  }

  setState(state: ValidationState) {
    this.state$.next(_.cloneDeep(state));
  }

  asObservable(): Observable<ValidationState> {
    return this.state$.asObservable();
  }
}
