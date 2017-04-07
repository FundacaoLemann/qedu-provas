import { TestBed, inject } from '@angular/core/testing';
import { ApplymentService } from './applyment.service';
import { StoreService } from '../../core/shared/store.service';
import { Observable } from 'rxjs/Observable';
import { ApplymentStatus } from '../../shared/model/applyment-status';

const mock = require('../../../../mock/db.json');
const STUDENT = mock.students[0];
const ASSESSMENT = mock.assessments[0];
const QUESTIONS = mock.questions;

function prepareAnswers(service) {
  service.initAnswers(4);
  service.setAnswer(0, 1);
  service.setAnswer(1, 2);
  service.setAnswer(2, 5);
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


  it('should set an answer', inject(
    [ApplymentService, StoreService],
    (service: ApplymentService, store: StoreService) => {
      prepareAnswers(service);
      expect(store.state.applyment.answers).toEqual([1, 2, 5, null]);
    })
  );

  it('should return a single answer', inject(
    [ApplymentService],
    (service: ApplymentService) => {
      prepareAnswers(service);
      expect(service.getAnswer(2)).toEqual(5);
    })
  );

  it('should return all the answers', inject(
    [ApplymentService],
    (service: ApplymentService) => {
      prepareAnswers(service);
      expect(service.getAllAnswers()).toEqual([1, 2, 5, null]);
    })
  );

  it('should get an observable of answers', inject(
    [ApplymentService],
    (service: ApplymentService) => {
      prepareAnswers(service);
      expect(service.answersAsObservable()).toEqual(jasmine.any(Observable));
    }
  ));

  describe('initAnswers()', () => {
    it('should initialize the answers container', inject(
      [ApplymentService, StoreService],
      (service: ApplymentService, store: StoreService) => {
        service.initAnswers(4);
        expect(store.state.applyment.answers).toEqual([null, null, null, null]);
      })
    );
  });

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

  describe('setItems', () => {
    it('should set questions', inject(
      [ApplymentService, StoreService],
      (service: ApplymentService, store: StoreService) => {
        service.setItems(QUESTIONS);
        expect(store.state.applyment.questions);
      }
    ));
  });

  describe('getItems', () => {
    it('should return questions', inject(
      [ApplymentService, StoreService],
      (service: ApplymentService, store: StoreService) => {
        service.setItems(QUESTIONS);
        expect(service.getItems()).toEqual(QUESTIONS);
      }
    ));

    it('should return empty array on error', inject(
      [ApplymentService],
      (service: ApplymentService) => {
        expect(service.getItems).toThrow();
        expect(service.getItems()).toEqual([]);
      }
    ));
  });

  describe('getApplymentStatus()', () => {
    it('should return the current data of the applyment', inject(
      [ApplymentService],
      (service: ApplymentService) => {
        service.setAssessment(ASSESSMENT);
        service.setStudent(STUDENT);
        service.setItems(QUESTIONS);
        service.initAnswers(1);
        service.setAnswer(0, 1);

        const applymentStatus = new ApplymentStatus();
        applymentStatus.assessmentToken = ASSESSMENT.id.toString();
        applymentStatus.studentToken = STUDENT.id.toString();
        applymentStatus.answers = [
          { questionId: '0', value: '1' }
        ];

        expect(service.getApplymentStatus()).toEqual(applymentStatus);
      }
    ));
  });
});

