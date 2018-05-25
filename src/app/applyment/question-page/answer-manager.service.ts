import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';

import { Answer } from '../../shared/model/answer';

@Injectable()
export class AnswerManagerService {
  protected answer: Answer = new Answer();
  protected answer$: BehaviorSubject<Answer>;
  protected interval: any;

  register(answer: Answer): Observable<Answer> {
    this.answer = this.cloneAnswer({
      ...answer,
      visualizedTimes: answer.visualizedTimes + 1,
    });
    this.answer$ = new BehaviorSubject<Answer>(this.answer);
    this.startTrackingTime();
    return this.answer$.asObservable();
  }

  setOption(optionId: number) {
    this.answer = this.cloneAnswer({ optionId });
    this.answer$.next(this.answer);
  }

  unregister() {
    clearInterval(this.interval);
  }

  private startTrackingTime() {
    this.unregister();
    this.interval = setInterval(() => {
      this.answer = this.cloneAnswer({
        timeSpentInSeconds: this.answer.timeSpentInSeconds + 1,
      });
      this.answer$.next(this.answer);
    }, 1000);
  }

  private cloneAnswer(answer = {}): Answer {
    return new Answer({ ...this.answer, ...answer });
  }
}
