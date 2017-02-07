import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

const API_URL = 'http://localhost:3000';

@Injectable()
export class ConnectionService {

  constructor(private http: Http) {
  }

  getStatusOnce(): Observable<boolean> {
    try {
      return (
        this.http.get(`${API_URL}/status`)
          .mapTo(true)
          .catch(e => {
            return Observable.of(false);
          })
      );
    } catch (err) {
      return Observable.of(false);
    }
  }
}
