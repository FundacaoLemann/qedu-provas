import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Timer } from '../../shared/timer';

@Injectable()
export class TimerService {
	private _timer: Timer;
	private _active: boolean = false;
	private _timeLeftInSeconds: number = 0;

	get active(): boolean { return this._active; }
	get timeLeft(): Observable<number> { return this._timer.timeLeft; }
	get timeLeftInSeconds(): number { return this._timeLeftInSeconds }
	
	constructor() {
		this._timer = new Timer(0);
	}

	setTimer(minutes: number) {
		this._timeLeftInSeconds = minutes * 60;
		this._timer.setTimer(minutes);
	}

	start() {
		if (this._timer.active) return;

		this._timer.start();
		this._timer.timeLeft.subscribe(timeLeft => this.onTimeLeftChanges(timeLeft));
	}

	onTimeLeftChanges(timeLeft: number) {
		this._timeLeftInSeconds = timeLeft;

		if (timeLeft <= 0) {
			this._timer.pause();
		}
	}
}
