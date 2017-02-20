import { TestBed, inject } from '@angular/core/testing';
import { ApplymentService } from './applyment.service';
import { StoreService } from '../../core/shared/store.service';
import { Observable } from 'rxjs';

const mockStudent = require('../../../../mock/db.json').students[0];

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
      service.setStudent(mockStudent);
      expect(store.state.applyment.student).toEqual(mockStudent);
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
    })
  );

});

