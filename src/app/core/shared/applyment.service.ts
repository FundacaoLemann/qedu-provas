import { Injectable } from '@angular/core';
import { Student } from '../../shared/model/student';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';

@Injectable()
export class ApplymentService {

  constructor (private store: StoreService) {
  }

  setStudent (student: Student) {
    this.store.setStudent(student)
  }

  getStudent (): Student {
    return this.store.getStudent();
  }

  setAnswer (questionId: number, answerId: number) {
    let answers = this.store.getAnswers();
    answers[questionId] = answerId;

    this.store.setAnswers(answers);
  }

  getAnswer (questionId: number): number {
    let answers = this.store.getAnswers();
    return answers[questionId];
  }

  getAnswers(): Array<number> {
    return this.store.getAnswers();
  }

}
