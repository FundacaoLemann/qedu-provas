import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TimeoutError } from 'rxjs/Rx';
import { ConnectionError } from '../../shared/errors/connection-error';
import { ResponseError } from '../../shared/errors/response-error';

@Injectable()
export abstract class RequestService {

  constructor() { }

  public handleError(error: Response | any): Observable<any> {
    let errorToThrow: any;

    if (error instanceof Response && error.status === 0) {
      errorToThrow = new ConnectionError();

    } else if (error instanceof Response && error.status !== 0) {
      errorToThrow = new ResponseError(error.json()['message']);

    } else if (error.name === 'TimeoutError') {
      errorToThrow = new ConnectionError();

    } else {
      errorToThrow = new Error(error);
    }

    return Observable.throw(errorToThrow);
  }
}
