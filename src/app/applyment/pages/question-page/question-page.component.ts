import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../../shared/model/item';
import { ApplymentService } from '../../shared/applyment.service';
import { Assessment } from '../../../shared/model/assessment';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import Answer from '../../../shared/model/answer';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnswerManagerService } from './answer-manager.service';
import { Option } from '../../../shared/model/option';

@Component({
  selector: 'qp-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.sass'],
  providers: [AnswerManagerService],
})
export class QuestionPageComponent implements OnInit, OnDestroy {
  question: Item = null;
  questionIndex = 0;
  questionsLength: number;
  assessment: Assessment;
  answer: Answer;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _applymentService: ApplymentService,
    private answerManager: AnswerManagerService,
  ) {}

  ngOnInit() {
    // this.assessment = this._applymentService.getAssessment();
    this.assessment = this._applymentService.getAssessment();
    this.questionsLength = this._applymentService.getItems().length;
    // Update question based on the url change
    this._route.params
      .pipe(switchMap(params => of(+params['question_id'] - 1)))
      .subscribe(
        (questionIndex: number) => {
          try {
            window.scrollTo(0, 0);
            this.questionIndex = questionIndex;
            this.question = this._applymentService.getItems()[questionIndex];
            this.answer = this._applymentService.getAnswer(questionIndex);
            this.answerManager
              .register(this.answer)
              .subscribe(this.handleAnswerChange.bind(this));
          } catch (err) {
            this.question = new Item();
          }
        },
        () => {
          this.question = new Item();
        },
      );
  }

  ngOnDestroy() {
    this.answerManager.unregister();
  }

  submitAnswerAndNavigateNext() {
    const nextQuestion = +this._route.snapshot.params['question_id'] + 1;
    const token = this._route.snapshot.params['token'];
    if (nextQuestion > this.questionsLength) {
      this._router.navigate(['prova', token, 'revisao']);
    } else {
      this._router.navigate(['prova', token, 'questao', nextQuestion]);
    }
  }

  submitAnswerAndNavigateBack() {
    const prevQuestion = +this._route.snapshot.params['question_id'] - 1;
    if (prevQuestion >= 1) {
      const uuid = this._route.snapshot.params['token'];
      this._router.navigate(['prova', uuid, 'questao', prevQuestion]);
    }
  }

  handleOptionClick(optionId: number) {
    this.answerManager.setOption(optionId);
  }

  handleAnswerChange (answer: Answer) {
    this.answer = answer;
    this._applymentService.setAnswer(this.questionIndex, this.answer);
  }
}
