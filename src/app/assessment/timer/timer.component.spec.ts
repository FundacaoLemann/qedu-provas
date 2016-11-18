import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimerComponent } from './timer.component';
import { TimerService } from './timer.service';

let comp: TimerComponent;
let fixture:  ComponentFixture<TimerComponent>;
let de: DebugElement;
let el: HTMLElement;

let timerService: TimerService;

describe('TimerComponent', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TimerComponent],
			providers: [TimerService]
		});

		fixture = TestBed.createComponent(TimerComponent);
		comp = fixture.componentInstance;

		de = fixture.debugElement.query(By.css('#timer'));
		el = de.nativeElement;

		timerService = fixture.debugElement.injector.get(TimerService);
		timerService.setTimer(1);
	});

	it('should display 01:00', () => {
		fixture.detectChanges();
		expect(el.textContent).toEqual("01:00");
	});

	it('should display the decreased time by seconds', (done) => {
		timerService.start();
		setTimeout(() => {
			expect(comp.timeLeft).toMatch(/00:5[8|7]/);
			done();
		}, 2000);
	});

});