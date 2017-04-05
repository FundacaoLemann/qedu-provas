import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../shared/model/item';
import { ApplymentService } from '../shared/applyment.service';
import { Assessment } from '../../shared/model/assessment';
import { AssessmentService } from '../../core/shared/assessment.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'qp-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.sass']
})
export class QuestionPageComponent implements OnInit {
  question: Item;
  questionText = '';
  questionIndex = 0;
  questionsLength: number;
  answers: any[];
  checkedAnswer = 0;
  assessment: Assessment;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _applymentService: ApplymentService,
              private _assessmentService: AssessmentService) {}

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
              this.question = new Item();
              this.answers = [];
            } finally {
              this.checkedAnswer = this._applymentService.getSingleAnswer(this.questionIndex) || 0;
            }
          },
          error => {
            this.question = new Item();
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
    // const answer = {
    //   assessmentToken: applymentStatus.assessmentToken,
    //   studentToken: applymentStatus.studentToken,
    //   questionId: this.question.id.toString(),
    //   value: this.checkedAnswer.toString()
    // };
    // this._assessmentService.postAnswer(answer);
  }


}
