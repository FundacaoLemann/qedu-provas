import { Component, Input } from '@angular/core';

@Component({
  selector: 'qp-current-question',
  templateUrl: 'current-question.component.html',
  styleUrls: ['current-question.component.sass']
})
export class CurrentQuestionComponent {
  @Input() currentQuestion: number = 0;
  @Input() questionsLength: number = 0;
}
