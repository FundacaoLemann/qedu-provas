import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../shared/model/item';
import { ApplymentService } from '../shared/applyment.service';
import { Assessment } from '../../shared/model/assessment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import Answer from '../../shared/model/answer';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnswerStatisticsService } from './answer-statistics.service';

@Component({
  selector: 'qp-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.sass'],
  providers: [AnswerStatisticsService],
})
export class QuestionPageComponent implements OnInit {
  question: Item;
  questionText: SafeHtml = null;
  questionIndex = 0;
  questionsLength: number;
  options: any[];
  checkedAnswer: number = null;
  assessment: Assessment;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _applymentService: ApplymentService,
    private _sanitizer: DomSanitizer,
    private answersStatistics: AnswerStatisticsService,
  ) {}

  ngOnInit() {
    this.assessment = this._applymentService.getAssessment();
    const items = this._applymentService.getItems();

    // Update question based on the url change
    this._route.params
      .switchMap(params => Observable.of(+params['question_id'] - 1))
      .subscribe(
        questionIndex => {
          try {
            const answer = this._applymentService.getAnswer(questionIndex);
            this.answersStatistics.track(answer);

            this.questionIndex = questionIndex;
            this.questionsLength = items.length;
            this.question = items[this.questionIndex];
            this.questionText = this.questionHTMLText();
            this.options = this.question.answers;
            this.checkedAnswer =
              answer && answer.optionId ? answer.optionId : 0;

            document.body.scrollTop = 0;
          } catch (err) {
            this.question = new Item();
            this.options = [];
          }
        },
        () => {
          this.question = new Item();
          this.options = [];
        },
      );
  }

  questionHTMLText(): SafeHtml {
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

  updateChecked(optionId: number) {
    const answer = this.answersStatistics.getTrackAnswer();
    answer.optionId = optionId;
    this.checkedAnswer = optionId;
    this._applymentService.setAnswer(this.questionIndex, answer);
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
}
