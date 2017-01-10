import { Injectable } from '@angular/core';
import { Student } from '../../shared/model/student';
import { StoreService } from './store.service';

@Injectable()
export class ApplymentService {

  constructor (private store: StoreService) {
  }

  setStudent (student: Student) {
    this.store.setValue('student', student);
  }

  getStudent (): Student {
    let student = this.store.getValue('student') || new Student();
    return student as Student;
  }

  setAnswer (questionId: number, answerId: number) {
    let answers = this.store.getValue('answers') || [];
    answers[questionId] = answerId;

    this.store.setValue('answers', answers);
  }

  getAnswer (questionId: number): number {
    let answers = this.store.getValue('answers') || [];
    return answers[questionId] || null;
  }

  getAnswers(): Array<number> {
    return this.store.getValue('answers') || [];
  }
}
