import { Observable, Subject } from 'rxjs';

export class Timer {
	private _totalTimeInSeconds: number;
	private _leftTimeInSeconds: number;
	private _interval: any;
	private _active: boolean = false;

	private _timeLeftSubject$: Subject<number> = new Subject<number>();
	timeLeft: Observable<number>;

	get active(): boolean {
		return this._active;
	}

	constructor (minutes?: number) {
		if (minutes) 
			this.setTimer(minutes);
		
		this.timeLeft = this._timeLeftSubject$.asObservable();
	}

	start(): void {
		if (this._active) return;

		this._active = true;
		setInterval(() => this._descreaseTime() , 1000);
	}

	pause(): void {
		this._active = false;
		clearInterval(this._interval);
	}

	setTimer(minutes: number) {
		this._totalTimeInSeconds = this._leftTimeInSeconds = minutes * 60;
	}

	private _descreaseTime() {
		--this._leftTimeInSeconds;

		if (this._leftTimeInSeconds <= 0) {
			this._leftTimeInSeconds = 0;
			this.pause();
		}
		
		this._timeLeftSubject$.next(this._leftTimeInSeconds);
	}
}

