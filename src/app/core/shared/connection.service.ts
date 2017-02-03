import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000';

@Injectable()
export class ConnectionService {

  constructor (private http: Http) {
  }

  getStatusOnce (): Observable<boolean> {
    try {
      return (
        this.http.get(`${API_URL}/status`)
          .mapTo(true)
          .catch(e => {
            return Observable.of(false)
          })
      );
    }
    catch ( err ) {
      return Observable.of(false);
    }
  }

}
