/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { StoreService } from './store.service';
import { Student } from '../../shared/model/student';
import { ASSESSMENTS } from '../../../mocks/assessments-mock';

describe('StoreService', () => {
  let service: StoreService;

  let question = ASSESSMENTS[0].questions[1];
  let answer = question.answers[4];
  let question2 = ASSESSMENTS[0].questions[0];
  let answer2 = question.answers[1];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService]
    });
  });

  beforeEach(() => {
    service = new StoreService();
  });

  it('should set data', inject([StoreService], (service: StoreService) => {
    let student = new Student('John Doe', '332441');
    service.setStudent(student);
  }));

  it('should store a new answer', () => {
    service.setAnswer(question.id, answer.id);
    expect(service.getAnswers()).toEqual([jasmine.objectContaining({
      question_id: question.id,
      answer_id: answer.id
    })]);

    service.setAnswer(question2.id, answer2.id);
    expect(service.getAnswers()).toEqual([
      jasmine.objectContaining({ question_id: question.id, answer_id: answer.id }),
      jasmine.objectContaining({ question_id: question2.id, answer_id: answer2.id })
    ]);
  });

  it('should update an set answer', () => {
    service.setAnswer(question.id, answer.id);
    service.setAnswer(question.id, question.answers[0].id);

    expect(service.getAnswers()).toEqual([
      jasmine.objectContaining({ question_id: question.id, answer_id: question.answers[0].id }),
    ]);
  });

});
