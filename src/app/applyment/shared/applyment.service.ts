import { Injectable } from '@angular/core';
import { Student } from '../../shared/model/student';
import { StoreService } from '../../core/shared/store.service';
import { Observable } from 'rxjs/Observable';
import { Assessment } from '../../shared/model/assessment';
import { Item } from '../../shared/model/item';
import { ApplymentStatus } from '../../shared/model/applyment-status';
import * as _ from 'lodash';

@Injectable()
export class ApplymentService {
  initialState = {
    applyment: {
      student: null,
      assessment: null,
      questions: [],
      answers: [],
    }
  };

  constructor(private _store: StoreService) {
    this._store.setState(this.initialState);
  }

  // Student
  setStudent(student: Student) {
    const newState = _.merge({}, this._store.state, { applyment: { student } });
    this._store.setState(newState);
  }

  getStudent(): Student {
    return this._store.state.applyment.student;
  }

  // Assessment
  setAssessment(assessment: Assessment) {
    const newState = _.merge({}, this._store.state, { applyment: { assessment } });
    this._store.setState(newState);
  }

  getAssessment(): Assessment {
    return this._store.state.applyment.assessment;
  }

  // Questions
  setItems(questions: Item[]) {
    const newState = _.merge({}, this._store.state, { applyment: { questions } });
    this._store.setState(newState);
  }

  getItems(): Item[] {
    return this._store.state.applyment.questions;
  }

  // Answers
  initAnswers(length: number) {
    const answers = Array(length).fill(null);

    const newState = _.merge({}, this._store.state, { applyment: { answers } });
    this._store.setState(newState);
  }

  setSingleAnswer(questionId: number, answerId: number) {
    const answers = this._store.state.applyment.answers;
    answers[questionId] = answerId;

    const newState = _.merge({}, this._store.state, { applyment: { answers } });
    this._store.setState(newState);
  }

  getSingleAnswer(questionId: number): number {
    return this._store.state.applyment.answers[questionId];
  }

  getAllAnswers(): number[] {
    return this._store.state.applyment.answers;
  }

  answersAsObservable(): Observable<number[]> {
    return this._store.asObservable().map(state => {
      return state.applyment.answers;
    });
  }

  // Status
  getApplymentStatus(): ApplymentStatus {
    const { assessment, student, answers } = this._store.state.applyment;

    const status = new ApplymentStatus();
    status.assessmentToken = assessment.id.toString();
    status.studentToken = student.id.toString();
    status.answers = [];
    for (const questionId in answers) {
      if ( answers[questionId] ) {
        status.answers.push({ questionId: questionId.toString(), value: answers[questionId].toString() });
      }
    }

    return status;
  }

}
