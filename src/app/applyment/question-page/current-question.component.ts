import { Component, Input } from '@angular/core';

@Component({
  selector: 'qp-current-question',
  templateUrl: 'current-question.component.html',
  styleUrls: ['current-question.component.sass']
})
export class CurrentQuestionComponent {
  @Input() currentQuestion = 0;
  @Input() questionsLength = 0;
}
