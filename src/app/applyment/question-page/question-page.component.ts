import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../shared/model/item';
import { ApplymentService } from '../shared/applyment.service';
import { Assessment } from '../../shared/model/assessment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import Answer from '../../shared/model/answer';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnswerManagerService } from './answer-manager.service';
import { Option } from '../../shared/model/option';

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
    private _sanitizer: DomSanitizer,
    private answerManager: AnswerManagerService,
  ) {}

  ngOnInit() {
    // this.assessment = this._applymentService.getAssessment();
    this.assessment = this._applymentService.getAssessment();
    this.questionsLength = this._applymentService.getItems().length;
    // Update question based on the url change
    this._route.params
      .switchMap(params => Observable.of(+params['question_id'] - 1))
      .subscribe(
        questionIndex => {
          try {
            document.body.scrollTop = 0;
            this.questionIndex = questionIndex;
            this.question = this._applymentService.getItems()[questionIndex];
            this.answer = this._applymentService.getAnswer(questionIndex);
            this.answerManager
              .register(this.answer)
              .subscribe(this.handleAnswerChange);
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

  questionHTML(): SafeHtml {
    let questionText = this.question.text;

    this.question.media.map(media => {
      switch (media.type) {
        case 'image':
          questionText = questionText.replace(
            `{{${media.id}}}`,
            `<p><img class="img-responsive center-block" src="${
              media.source
            }" /></p>`,
          );
          break;
      }
    });

    return this._sanitizer.bypassSecurityTrustHtml(questionText);
  }

  submitAnswerAndNavigateNext() {
    this.postAnswer();
    const nextQuestion = +this._route.snapshot.params['question_id'] + 1;
    const token = this._route.snapshot.params['token'];
    if (nextQuestion > this.questionsLength) {
      this._router.navigate(['prova', token, 'revisao']);
    } else {
      this._router.navigate(['prova', token, 'questao', nextQuestion]);
    }
  }

  submitAnswerAndNavigateBack() {
    this.postAnswer();
    const prevQuestion = +this._route.snapshot.params['question_id'] - 1;
    if (prevQuestion >= 1) {
      const uuid = this._route.snapshot.params['token'];
      this._router.navigate(['prova', uuid, 'questao', prevQuestion]);
    }
  }

  postAnswer() {
    const applymentStatus = this._applymentService.getApplymentStatus();
  }

  handleOptionClick(optionId: number) {
    this.answerManager.setOption(optionId);
  }

  handleAnswerChange = (answer: Answer) => {
    this.answer = answer;
    this._applymentService.setAnswer(this.questionIndex, this.answer);
  };

  isCorrectOption(option: Option): boolean {
    return option.id === this.answer.optionId;
  }
}
