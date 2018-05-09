
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectionError } from '../../shared/errors/connection-error';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export abstract class RequestService {

  constructor() { }

  public handleError(error: any): Observable<any> {
    let errorToThrow: any;

    if (error instanceof HttpErrorResponse && error.status === 0) {
      errorToThrow = new ConnectionError();

    } else if (error instanceof HttpErrorResponse && error.status !== 0) {
      errorToThrow = new Error(error.error.message);

    } else if (error.name === 'TimeoutError') {
      errorToThrow = new ConnectionError();

    } else {
      errorToThrow = new Error(error);
    }

    return observableThrowError(errorToThrow);
  }
}
