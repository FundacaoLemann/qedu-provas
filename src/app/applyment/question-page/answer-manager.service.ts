import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Answer } from '../../shared/model/answer';

@Injectable()
export class AnswerManagerService {
  protected answer: Answer;
  protected answer$: Subject<Answer>;

  register(answer: Answer): Observable<Answer> {
    this.answer = new Answer({ ...answer });
    this.answer$ = new Subject<Answer>();
    return this.answer$.asObservable();
  }

  setOption(optionId: number) {
    const answer = new Answer({ ...this.answer, optionId });
    this.answer$.next(answer);
  }
}
