import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, TimeoutError } from 'rxjs';

import { ConnectionError } from '../../shared/errors/connection-error';
import { environment } from '../../../environments/environment';

const { API_URL } = environment;


@Injectable()
export abstract class RequestService {

  constructor() { }

  public getApiUrl(resources = ''): string {
    return `${API_URL}/${resources}`;
  }

  protected createRequestUrl(resource = '', params: Object): string {
    return Object
      .entries(params)
      .reduce(
        (acc, [key, value]) => acc.replace(`:${key}`, value.toString()),
        this.getApiUrl(resource)
      ) as string;
  }

  public handleError(error: any): Observable<any> {
    let errorToThrow: any;

    if (error instanceof HttpErrorResponse && error.status === 0) {
      errorToThrow = new ConnectionError();

    } else if (error instanceof HttpErrorResponse && error.status !== 0) {
      errorToThrow = new Error(error.error.message);

    } else if (error instanceof TimeoutError) {
      errorToThrow = new ConnectionError();

    } else {
      errorToThrow = new Error(error);
    }

    return throwError(errorToThrow);
  }
}
