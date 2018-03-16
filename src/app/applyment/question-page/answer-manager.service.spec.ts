import {
  TestBed,
  inject,
  tick,
  fakeAsync,
  discardPeriodicTasks,
} from '@angular/core/testing';

import { AnswerManagerService } from './answer-manager.service';
import { Answer } from '../../shared/model/answer';

describe('AnswerManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnswerManagerService],
    });
  });

  it(
    'should be created',
    inject([AnswerManagerService], (service: AnswerManagerService) => {
      expect(service).toBeTruthy();
    }),
  );

  it(
    `item's visualizedTime should be incremented by 1`,
    fakeAsync(
      inject([AnswerManagerService], (service: AnswerManagerService) => {
        const answer = new Answer({});
        service.register(answer).subscribe((updatedAnswer: Answer) => {
          expect(updatedAnswer.visualizedTimes).toEqual(1);
        });
        discardPeriodicTasks();
      }),
    ),
  );

  it(
    'updates optionId and emit',
    fakeAsync(
      inject([AnswerManagerService], (service: AnswerManagerService) => {
        const answer = new Answer();
        const expectedAnswers = [
          new Answer({ visualizedTimes: 1 }), // first emission
          new Answer({ visualizedTimes: 1, optionId: 2 }),
        ];
        const answers = [];
        service.register(answer).subscribe(updatedAnswer => {
          answers.push(updatedAnswer);
        });

        service.setOption(2);
        expect(answers).toEqual(expectedAnswers);

        discardPeriodicTasks();
      }),
    ),
  );

  it(
    'update spentTimeInSeconds by 3',
    fakeAsync(
      inject([AnswerManagerService], (service: AnswerManagerService) => {
        const answer = new Answer();
        let lastEmittedAnswer: Answer;

        service
          .register(answer)
          .subscribe(emittedAnswer => (lastEmittedAnswer = emittedAnswer));

        tick(3000);
        expect(lastEmittedAnswer).toEqual(
          new Answer({
            visualizedTimes: 1,
            spentTimeInSeconds: 3,
          }),
        );
        discardPeriodicTasks();
      }),
    ),
  );

  it(
    'switch between answers',
    fakeAsync(
      inject([AnswerManagerService], (service: AnswerManagerService) => {
        let answer1 = new Answer({ itemId: '1' });
        let answer2 = new Answer({ itemId: '2' });

        // First tracking
        service
          .register(answer1)
          .subscribe(updateAnswer => (answer1 = updateAnswer));
        tick(1000);
        service.setOption(2);
        tick(7000);

        // Change to track answer 2
        service
          .register(answer2)
          .subscribe(updatedAnswer => (answer2 = updatedAnswer));
        tick(10000);

        // Back to answer1
        service
          .register(answer1)
          .subscribe(updatedAnswer => answer1 = updatedAnswer);
        tick(3000);
        service.setOption(4);

        expect(answer1).toEqual(
          new Answer({
            itemId: '1',
            optionId: 4,
            visualizedTimes: 2,
            spentTimeInSeconds: 11,
          }),
        );
        expect(answer2).toEqual(
          new Answer({
            itemId: '2',
            optionId: 0,
            visualizedTimes: 1,
            spentTimeInSeconds: 10,
          }),
        );
        discardPeriodicTasks();
      }),
    ),
  );
});
