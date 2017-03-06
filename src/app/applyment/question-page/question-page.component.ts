import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../shared/model/question';
import { ApplymentService } from '../shared/applyment.service';
import { Assessment } from '../../shared/model/assessment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'qp-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.sass']
})
export class QuestionPageComponent implements OnInit {
  question: Question;
  questionText = '';
  questionIndex = 0;
  questionsLength: number;
  answers: any[];
  checkedAnswer = 0;
  assessment: Assessment;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _applymentService: ApplymentService,) {}

  ngOnInit() {
    this.assessment = this._applymentService.getAssessment();

    // Update question based on the url change
    this._route.params
        .switchMap(params => Observable.of(+params['question_id'] - 1))
        .subscribe(
          questionIndex => {
            try {
              const questions = this._applymentService.getQuestions();

              this.questionIndex = questionIndex;
              this.questionsLength = questions.length;
              this.question = questions[this.questionIndex];
              this.questionText = this.questionHTMLText();
              this.answers = this.question.answers;
              document.body.scrollTop = 0;
            } catch (err) {
              this.question = new Question();
              this.answers = [];
            } finally {
              this.checkedAnswer = this._applymentService.getSingleAnswer(this.questionIndex) || 0;
            }
          },
          error => {
            this.question = new Question();
            this.answers = [];
          }
        );
  }

  questionHTMLText(): string {
    let questionText = this.question.text;

    this.question.media.map(media => {
      switch (media.type) {
        case 'image':
          questionText = questionText.replace(`{{${media.id}}}`,
            `<p><img class="img-responsive center-block" src="${media.source}" /></p>`);
          break;
      }
    });

    return questionText;
  }

  updateChecked(answerId: number) {
    this.checkedAnswer = answerId;
    this._applymentService.setSingleAnswer(this.questionIndex, answerId);
  }

  next() {
    const nextQuestion = (+this._route.snapshot.params['question_id']) + 1;
    const uuid = this._route.snapshot.params['token'];

    if ( nextQuestion > this.questionsLength ) {
      this._router.navigate(['prova', uuid, 'revisao']);
    } else {
      this._router.navigate(['prova', uuid, 'questao', nextQuestion]);
    }
  }

  back() {
    const prevQuestion = (+this._route.snapshot.params['question_id']) - 1;

    if ( prevQuestion >= 1 ) {
      const uuid = this._route.snapshot.params['token'];
      this._router.navigate(['prova', uuid, 'questao', prevQuestion]);
    }
  }

}
