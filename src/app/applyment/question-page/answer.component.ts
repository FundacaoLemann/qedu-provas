import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Answer } from '../../shared/model/answer';

@Component({
  selector: 'qp-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.sass']
})
export class AnswerComponent {
  @Input() answer: Answer = { id: 0, text: '' };
  @Input() checked: boolean = false;
  @Output() onClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor () {
  }

  onClick () {
    this.checked = true;
    this.onClicked.emit(this.answer.id);
  }

}
