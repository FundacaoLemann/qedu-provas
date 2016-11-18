import { Timer } from './timer';

let timer: Timer;

describe('Class Timer', () => {

	fdescribe('.timeLeft()', () => {

		it('should return an string in with time left format +00:00 ', () => {
			timer = new Timer(120);
			expect(timer.timeLeft()).toEqual('120:00');
		});

		xit('should return a string with time reduced', (done) => {
			timer = new Timer(120);
			timer.start();
			setTimeout(() => {
				timer.pause();
				expect(timer.timeLeft()).toMatch(/119:5(6|7)/);
				done();
			}, 4000);
		});
		
	});


});