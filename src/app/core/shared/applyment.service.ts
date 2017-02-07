import { Injectable } from '@angular/core';
import { Student } from '../../shared/model/student';
import { StoreService } from './store.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApplymentService {

  constructor (private store: StoreService) {
  }

  setStudent (student: Student) {
    this.store.setStudent(student);
  }

  getStudent (): Student {
    return this.store.getStudent();
  }

  setAnswer (questionId: number, answerId: number) {
    const answers = this.store.getAnswers();
    answers[questionId] = answerId;

    this.store.setAnswers(answers);
  }

  initAnswers (length: number) {
    const initialAnswers = Array(length).fill(0);
    this.store.setAnswers(initialAnswers);
  }

  getAnswer (questionId: number): number {
    const answers = this.store.getAnswers();
    return answers[questionId];
  }

  getAnswers (): Array<number> {
    return this.store.getAnswers();
  }

  getAnswersAsObservable (): Observable<number[]> {
    return this.store.answers;
  }

}
