import { TestBed, inject } from '@angular/core/testing';
import { ApplymentService } from './applyment.service';
import { StoreService } from '../../core/shared/store.service';
import { Observable } from 'rxjs/Observable';

const mock = require('../../../../mock/db.json');
const STUDENT = mock.students[0];
const ASSESSMENT = mock.assessments[0];
const QUESTIONS = mock.questions;

function prepareAnswers(service) {
  service.initAnswers(4);
  service.setSingleAnswer(0, 1);
  service.setSingleAnswer(1, 2);
  service.setSingleAnswer(2, 5);
}

describe('ApplymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApplymentService,
        StoreService
      ]
    });
  });

  it('should load', inject([ApplymentService], (service: ApplymentService) => {
    expect(service).toBeTruthy();
  }));

  it('should set a student', inject(
    [ApplymentService, StoreService],
    (service: ApplymentService, store: StoreService) => {
      service.setStudent(STUDENT);
      expect(store.state.applyment.student).toEqual(STUDENT);
    })
  );

  it('should init the answers array', inject(
    [ApplymentService, StoreService],
    (service: ApplymentService, store: StoreService) => {
      prepareAnswers(service);
      expect(store.state.applyment.answers.length).toEqual(4);
    })
  );

  it('should set an answer', inject(
    [ApplymentService, StoreService],
    (service: ApplymentService, store: StoreService) => {
      prepareAnswers(service);
      expect(store.state.applyment.answers).toEqual([1, 2, 5, 0]);
    })
  );

  it('should return a single answer', inject(
    [ApplymentService],
    (service: ApplymentService) => {
      prepareAnswers(service);
      expect(service.getSingleAnswer(2)).toEqual(5);
    })
  );

  it('should return all the answers', inject(
    [ApplymentService],
    (service: ApplymentService) => {
      prepareAnswers(service);
      expect(service.getAllAnswers()).toEqual([1, 2, 5, 0]);
    })
  );

  it('should get an observable of answers', inject(
    [ApplymentService],
    (service: ApplymentService) => {
      prepareAnswers(service);
      expect(service.answersAsObservable()).toEqual(jasmine.any(Observable));
    }
  ));

  describe('setAssessment()', () => {
    it('should set an assessment', inject(
      [ApplymentService, StoreService],
      (service: ApplymentService, store: StoreService) => {
        service.setAssessment(ASSESSMENT);
        expect(store.state.applyment.assessment).toEqual(ASSESSMENT);
      }
    ));
  });

  describe('getAssessment()', () => {
    it('should return an assessment', inject(
      [ApplymentService],
      (service: ApplymentService) => {
        service.setAssessment(ASSESSMENT);
        expect(service.getAssessment()).toEqual(ASSESSMENT);
      }
    ));

    it('should return null on error', inject(
      [ApplymentService],
      (service: ApplymentService) => {
        expect(service.getAssessment).toThrow();
        expect(service.getAssessment()).toEqual(null);
      }
    ));
  });

  describe('setQuestions', () => {
    it('should set questions', inject(
      [ApplymentService, StoreService],
      (service: ApplymentService, store: StoreService) => {
        service.setQuestions(QUESTIONS);
        expect(store.state.applyment.questions);
      }
    ));
  });

  describe('getQuestions', () => {
    it('should return questions', inject(
      [ApplymentService, StoreService],
      (service: ApplymentService, store: StoreService) => {
        service.setQuestions(QUESTIONS);
        expect(service.getQuestions()).toEqual(QUESTIONS);
      }
    ));

    it('should return empty array on error', inject(
      [ApplymentService],
      (service: ApplymentService) => {
        expect(service.getQuestions).toThrow();
        expect(service.getQuestions()).toEqual([]);
      }
    ));
  });
});

