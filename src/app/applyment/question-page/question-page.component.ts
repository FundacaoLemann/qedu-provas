import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../shared/model/question';
import { StoreService } from '../../core/shared/store.service';

import { ASSESSMENTS } from '../../../mocks/assessments-mock';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.sass']
})
export class QuestionPageComponent implements OnInit {
  question: Question;
  checked: number = 0;

  constructor (private route: ActivatedRoute,
               private router: Router,
               private store: StoreService) {
    this.question = ASSESSMENTS[0].questions[0];
  }

  ngOnInit () {
  }

  updateChecked (answer_id: number) {
    this.checked = answer_id;
    this.store.setAnswer(this.question.id, answer_id);
  }

  nextQuestion() {
    let questionId = (+this.route.snapshot.params['question_id'])+1;
    let uuid = this.route.snapshot.params['uuid'];
    this.router.navigate(['prova', uuid, 'questao', questionId]);
  }

}
