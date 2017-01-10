import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Question } from '../../shared/model/question';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ApplymentService } from '../../core/shared/applyment.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.sass']
})
export class QuestionPageComponent implements OnInit {
  question: Question;
  questionsLength: number;
  answers: any[];
  checkedAnswer: number = 0;
  questionIndex: number = 0;

  constructor (private assessmentService: AssessmentService,
               private route: ActivatedRoute,
               private router: Router,
               private applymentService: ApplymentService) {
  }

  ngOnInit () {
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
            this.answers = this.question.answers;
          }
          catch ( err ) {
            this.question = new Question();
            this.answers = [];
          }
          finally {
            this.checkedAnswer = this.applymentService.getAnswer(this.questionIndex) || 0;
          }
        },
        error => {
          this.question = new Question();
          this.answers = [];
        }
      );
  }

  updateChecked (answerId: number) {
    this.checkedAnswer = answerId;
    this.applymentService.setAnswer(this.questionIndex, answerId);
  }

  next () {
    let nextQuestion = (+this.route.snapshot.params['question_id']) + 1;
    let uuid = this.route.snapshot.params['uuid'];

    if ( nextQuestion > this.questionsLength ) {
      this.router.navigate(['prova', uuid, 'revisao']);
    }
    else {
      this.router.navigate(['prova', uuid, 'questao', nextQuestion]);
    }
  }

  back () {
    let prevQuestion = (+this.route.snapshot.params['question_id']) - 1;

    if ( prevQuestion >= 1 ) {
      let uuid = this.route.snapshot.params['uuid'];
      this.router.navigate(['prova', uuid, 'questao', prevQuestion]);
    }
  }

}
