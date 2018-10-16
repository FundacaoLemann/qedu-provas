import { TestBed, inject } from '@angular/core/testing';
import { ApplymentService } from './applyment.service';
import { StoreService } from '../../core/services/store.service';
import { Observable } from 'rxjs';
import { ApplymentStatus } from '../../shared/model/applyment-status';
import { Assessment } from '../../shared/model/assessment';
import { Student } from 'app/shared';
import Answer from '../../shared/model/answer';
import Mock from '../../../../mock/mock';

const mock = require('../../../../mock/db.json');
const STUDENT = mock.students[0];
const ASSESSMENT = mock.assessments[0];
const QUESTIONS = mock.questions;
const ANSWERS = [
  Mock.mockAnswer(0),
  Mock.mockAnswer(1),
  Mock.mockAnswer(2),
];

function prepareAnswers(service) {
  service.initAnswers(QUESTIONS);
  service.setAnswer(0, ANSWERS[0]);
  service.setAnswer(1, ANSWERS[1]);
  service.setAnswer(2, ANSWERS[2]);
}

describe('ApplymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplymentService, StoreService],
    });
  });

  it(
    'should load',
    inject([ApplymentService], (service: ApplymentService) => {
      expect(service).toBeTruthy();
    }),
  );

  it(
    'should set a student',
    inject(
      [ApplymentService, StoreService],
      (service: ApplymentService, store: StoreService) => {
        service.setStudent(STUDENT);
        expect(store.state.applyment.student).toEqual(STUDENT);
      },
    ),
  );

  it(
    'should return a single option',
    inject([ApplymentService], (service: ApplymentService) => {
      prepareAnswers(service);
      expect(service.getAnswer(2)).toEqual(ANSWERS[2]);
    }),
  );

  it(
    'should return all the answers',
    inject([ApplymentService], (service: ApplymentService) => {
      prepareAnswers(service);
      expect(service.getAllAnswers()).toEqual(ANSWERS);
    }),
  );

  it(
    'should get an observable of answers',
    inject([ApplymentService], (service: ApplymentService) => {
      prepareAnswers(service);
      expect(service.answersAsObservable()).toEqual(jasmine.any(Observable));
    }),
  );

  describe('initAnswers()', () => {
    it(
      'initialize empty answers',
      inject(
        [ApplymentService, StoreService],
        (service: ApplymentService, store: StoreService) => {
          service.initAnswers(QUESTIONS);

          const answers = store.state.applyment.answers;
          const expectAnswer = {
            itemId: '58d2f1af4a083c00194437c7',
            optionId: 0,
            visualizedTimes: 0,
            timeSpentInSeconds: 0,
          };

          expect(answers.length).toEqual(3);
          expect(answers[0]).toEqual(jasmine.any(Answer));
          expect({ ...answers[0] }).toEqual({ ...expectAnswer });
        },
      ),
    );
  });

  describe('setAssessment()', () => {
    it(
      'should set an assessment',
      inject(
        [ApplymentService, StoreService],
        (service: ApplymentService, store: StoreService) => {
          service.setAssessment(ASSESSMENT);
          expect(store.state.applyment.assessment).toEqual(ASSESSMENT);
        },
      ),
    );
  });

  describe('getAssessment()', () => {
    it(
      'should return an assessment',
      inject([ApplymentService], (service: ApplymentService) => {
        service.setAssessment(ASSESSMENT);
        expect(service.getAssessment()).toEqual(ASSESSMENT);
      }),
    );

    it(
      'should return null on errors',
      inject([ApplymentService], (service: ApplymentService) => {
        expect(service.getAssessment).toThrow();
        expect(service.getAssessment()).toEqual(<Assessment>{});
      }),
    );
  });

  describe('setItems', () => {
    it(
      'should set questions',
      inject(
        [ApplymentService, StoreService],
        (service: ApplymentService, store: StoreService) => {
          service.setItems(QUESTIONS);
          expect(store.state.applyment.questions);
        },
      ),
    );
  });

  describe('getItems', () => {
    it(
      'should return questions',
      inject(
        [ApplymentService, StoreService],
        (service: ApplymentService, store: StoreService) => {
          service.setItems(QUESTIONS);
          expect(service.getItems()).toEqual(QUESTIONS);
        },
      ),
    );

    it(
      'should return empty array on errors',
      inject([ApplymentService], (service: ApplymentService) => {
        expect(service.getItems).toThrow();
        expect(service.getItems()).toEqual([]);
      }),
    );
  });

  describe('getApplymentStatus()', () => {
    it(
      'should return the current data of the applyment',
      inject([ApplymentService], (service: ApplymentService) => {
        service.setAssessment(ASSESSMENT);
        service.setStudent(STUDENT);
        service.setItems(QUESTIONS);
        service.initAnswers(QUESTIONS);
        service.setAnswer(2, new Answer({itemId: QUESTIONS[2].id, optionId: 3}));

        const applymentStatus = new ApplymentStatus();
        applymentStatus.assessmentToken = ASSESSMENT.id.toString();
        applymentStatus.studentToken = STUDENT.id.toString();
        applymentStatus.answers = [
          new Answer({itemId: QUESTIONS[0].id, optionId: 0 }),
          new Answer({itemId: QUESTIONS[1].id, optionId: 0 }),
          new Answer({itemId: QUESTIONS[2].id, optionId: 3 }),
        ];

        expect(service.getApplymentStatus()).toEqual(applymentStatus);
      }),
    );
  });

  describe('resetInitialState()', () => {
    it(
      'should reset the initial state of assessment',
      inject([ApplymentService], (service: ApplymentService) => {
        service.resetInitialState();

        expect(service.getAllAnswers()).toEqual([]);
        expect(service.getStudent()).toEqual(<Student>{});
        expect(service.getAssessment()).toEqual(<Assessment>{});
      }),
    );
  });
});
