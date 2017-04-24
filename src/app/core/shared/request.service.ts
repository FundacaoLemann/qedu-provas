import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import MESSAGES from './messages/messages';

@Injectable()
export abstract class RequestService {

  constructor() { }

  public handleError(error: Response | any): Observable<any> {
    let errorMessage = '';

    if (error instanceof Response && error.status === 0) {
      errorMessage = MESSAGES.SYSTEM_NOT_AVAILABLE;
    } else if (error instanceof Response && error.status !== 0) {
      errorMessage = error.json()['message'];
    } else {
      errorMessage = error.message || JSON.stringify(error);
    }

    return Observable.throw(errorMessage);
  }
}
