import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Question } from '../../shared/model/question';
import { StoreService } from '../../core/shared/store.service';
import { AssessmentService } from '../../core/shared/assessment.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.sass']
})
export class QuestionPageComponent implements OnInit {
  question: Question;
  answers: any[];
  checkedAnswer: number = 0;
  assesmentId: number = 0;
  questionId: number = 0;

  constructor (private assessmentService: AssessmentService,
               private route: ActivatedRoute,
               private router: Router,
               private store: StoreService) {
  }

  ngOnInit () {
    this.route.params
      .switchMap(
        (params: Params) => {
          this.questionId = (+params['question_id']) - 1;
          return this.assessmentService.getQuestions(params['uuid']);
        }
      )
      .subscribe(
        questions => {
          try {
            this.question = questions[this.questionId];
            this.answers = this.question.answers;
          }
          catch ( err ) {
            this.question = new Question();
            this.answers = [];
          }
          finally {
            this.checkedAnswer = 0;
          }
        },
        error => {
          this.question = new Question();
          this.answers = [];
        }
      );
  }

  updateChecked (answer_id: number) {
    this.checkedAnswer = answer_id;
    this.store.setAnswer(this.question.id, answer_id);
  }

  nextQuestion () {
    let questionId = (+this.route.snapshot.params['question_id']) + 1;

    let uuid = this.route.snapshot.params['uuid'];
    this.router.navigate(['prova', uuid, 'questao', questionId]);
  }

  prevQuestion () {
    let questionId = (+this.route.snapshot.params['question_id']) - 1;

    if ( questionId >= 1) {
      let uuid = this.route.snapshot.params['uuid'];
      this.router.navigate(['prova', uuid, 'questao', questionId]);
    }
  }

}
