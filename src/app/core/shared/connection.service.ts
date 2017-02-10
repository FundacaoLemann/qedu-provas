import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs';

const API_URL = 'http://localhost:3000';

@Injectable()
export class ConnectionService {
  status: Observable<boolean>;
  times = 0;
  interval = 500;
  limit = 0;
  private _reference = null;
  private _isFetching = false;
  private _fetching$ = new Subject();

  get isFetching() {
    return this._isFetching;
  }

  constructor(private http: Http) {
    this.status = this._fetching$.asObservable();
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

  startWatch(interval: number = 500, limit: number = 0): Observable<boolean> {
    if ( this._isFetching ) {
      throw new Error('Already watching status. Stop the watching if you want to reinitialize.');
    } else {
      this._isFetching = true;
      this.interval = interval;
      this.limit = limit;
      this.times = 0;
    }

    const request = () => {
      if ( this.limit === 0 || this.times < this.limit ) {
        this.times++;
        this.getStatusOnce()
          .subscribe(status => {
            this._fetching$.next(status);
          });
      } else {
        this.stopWatch();
      }
    };

    this._reference = setInterval(request, this.interval);

    return this.status;
  }

  stopWatch() {
    clearInterval(this._reference);
    this._isFetching = false;
  }
}
