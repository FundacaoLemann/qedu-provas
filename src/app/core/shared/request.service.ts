import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class RequestService {

  constructor() { }

  public handleError(error: Response | any): Observable<any> {
    let errorMessage = '';
    if (error instanceof Response) {
      errorMessage = error.json()['message'];
    } else {
      errorMessage = error.message || JSON.stringify(error);
    }

    return Observable.throw(errorMessage);
  }
}
