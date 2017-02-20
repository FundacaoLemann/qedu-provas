import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Question } from '../../shared/model/question';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ApplymentService } from '../shared/applyment.service';
import { Assessment } from '../../shared/model/assessment';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'qp-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.sass']
})
export class QuestionPageComponent implements OnInit {
  question: Question;
  questionText = '';
  questionsLength: number;
  answers: any[];
  checkedAnswer = 0;
  questionIndex = 0;
  assessment: Assessment;

  constructor(private assessmentService: AssessmentService,
              private route: ActivatedRoute,
              private router: Router,
              private applymentService: ApplymentService) {
  }

  ngOnInit() {
    // Load the assessment
    this.assessmentService
      .getAssessment(this.route.snapshot.params['uuid'])
      .subscribe(assessment => this.assessment = assessment);

    // Update question based on the url change
    this.route.params
      .switchMap(
        (params: Params) => {
          this.questionIndex = (+params['question_id']) - 1;
          return this.assessmentService.getQuestions(params['uuid']);
        }
      )
      .subscribe(
        questions => {
          try {
            this.questionsLength = questions.length;
            this.question = questions[this.questionIndex];
            this.questionText = this.questionHTMLText();
            this.answers = this.question.answers;
            document.body.scrollTop = 0;
          } catch (err) {
            this.question = new Question();
            this.answers = [];
          } finally {
            this.checkedAnswer = this.applymentService.getSingleAnswer(this.questionIndex) || 0;
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
    this.applymentService.setSingleAnswer(this.questionIndex, answerId);
  }

  next() {
    const nextQuestion = (+this.route.snapshot.params['question_id']) + 1;
    const uuid = this.route.snapshot.params['uuid'];

    if ( nextQuestion > this.questionsLength ) {
      this.router.navigate(['prova', uuid, 'revisao']);
    } else {
      this.router.navigate(['prova', uuid, 'questao', nextQuestion]);
    }
  }

  back() {
    const prevQuestion = (+this.route.snapshot.params['question_id']) - 1;

    if ( prevQuestion >= 1 ) {
      const uuid = this.route.snapshot.params['uuid'];
      this.router.navigate(['prova', uuid, 'questao', prevQuestion]);
    }
  }

}
