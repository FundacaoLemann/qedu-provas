import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { TimerService } from './timer.service';

@Component({
  selector: 'qp-timer',
  template: `<div id="timer">{{ timeLeft }}</div>`,
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit, OnDestroy {

	timeLeft: string = '00:00'

  private _timeLeftSubscription: Subscription

  constructor(
  	private timer: TimerService
  ) {
  	this._timeLeftSubscription = this.timer.timeLeft.subscribe(timeLeft => this.timeLeft = this.clockFormat(timeLeft));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._timeLeftSubscription.unsubscribe();
  }

  clockFormat(time: number): string {
    let minutes = Math.floor(time / 60).toString();
    let seconds = (time % 60).toString();
    let padleft = "00";

    minutes = (padleft + minutes).slice(-(minutes.length > padleft.length ? minutes.length : padleft.length));
    seconds = (padleft + seconds).slice(-(seconds.length > padleft.length ? seconds.length : padleft.length));
    
    return `${minutes}:${seconds}`;
  }

}
