import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Timer } from '../../shared/timer';

@Injectable()
export class TimerService {
	private _timer: Timer;
	private _active: boolean = false;

	get active(): boolean { return this._active; }
	get timeLeft(): Observable<number> { return this._timer.timeLeft; }
	
	constructor() {
		this._timer = new Timer(0);
	}

	setTimer(minutes: number) {
		this._timer.setTimer(minutes);
	}

	start() {
		if (this._active) return;

		this._active = true;
		this._timer.start();

		this._timer.timeLeft.subscribe(timeLeft => this.onTimeLeftChanges(timeLeft));
	}

	onTimeLeftChanges(timeLeft: number) {
		if (timeLeft <= 0)
			window.alert('Fim da Prova');
	}
}
