import { Injectable } from '@angular/core';
import { Student } from '../../shared/model/student';
import { StoreService } from '../../core/shared/store.service';
import { Observable } from 'rxjs/Observable';
import { Assessment } from '../../shared/model/assessment';
import { Item } from '../../shared/model/item';
import { ApplymentStatus } from '../../shared/model/applyment-status';
import * as _ from 'lodash';
import Answer from '../../shared/model/answer';

@Injectable()
export class ApplymentService {
  initialState = {
    applyment: {
      student: <Student>{},
      assessment: <Assessment>{},
      questions: [],
      answers: [],
    },
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
    const newState = _.merge({}, this._store.state, {
      applyment: { assessment },
    });
    this._store.setState(newState);
  }

  getAssessment(): Assessment {
    return this._store.state.applyment.assessment;
  }

  // Questions
  setItems(questions: Item[]) {
    const newState = _.merge({}, this._store.state, {
      applyment: { questions },
    });
    this._store.setState(newState);

    this.initAnswers(questions);
  }

  getItems(): Item[] {
    return this._store.state.applyment.questions;
  }

  // Answers
  initAnswers(items: Item[]) {
    const answers = items.map((item: Item) => new Answer({ itemId: item.id }));

    const newState = _.merge({}, this._store.state, { applyment: { answers } });
    this._store.setState(newState);
  }

  setAnswer(itemIndex: number, answer: Answer) {
    const answers = this._store.state.applyment.answers;
    answers[itemIndex] = answer;
    window.localStorage.setItem(
      `answers-${this._store.state.applyment.student.token}`,
      window.btoa(JSON.stringify(answers)),
    );

    const newState = _.merge({}, this._store.state, { applyment: { answers } });
    this._store.setState(newState);
  }

  getAnswer(itemIndex: number): Answer {
    const storage = window.localStorage.getItem(
      `answers-${this._store.state.applyment.student.token}`,
    );
    if (!!storage) {
      const rawAnswers = JSON.parse(atob(storage));
      const answers = rawAnswers.map(answer => new Answer(answer));
      const newState = _.merge({}, this._store.state, {
        applyment: { answers },
      });
      this._store.setState(newState);
    }

    return this._store.state.applyment.answers[itemIndex] || null;
  }

  getAllAnswers(): Answer[] {
    return this._store.state.applyment.answers;
  }

  answersAsObservable(): Observable<Answer[]> {
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
    status.answers = answers;

    return status;
  }

  resetInitialState() {
    this._store.setState(_.create(this.initialState));
  }
}
