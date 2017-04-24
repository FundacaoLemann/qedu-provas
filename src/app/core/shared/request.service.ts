import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class RequestService {

  constructor() { }

  public handleError(error: Response | any): Observable<any> {
    let errorMessage = '';

    if (error instanceof Response && error.status === 0) {
      errorMessage = 'Sistema temporariamente indisponível. Tente novamente mais tarde.';
    } else if (error instanceof Response && error.status !== 0) {
      errorMessage = error.json()['message'];
    } else {
      errorMessage = error.message || JSON.stringify(error);
    }

    return Observable.throw(errorMessage);
  }
}
