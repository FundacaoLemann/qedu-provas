import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Option } from '../../shared/model/option';

@Component({
  selector: 'qp-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.sass']
})
export class AnswerComponent {
  @Input() option: Option = { id: 0, text: '' };
  @Input() checked = false;
  @Output() onClicked: EventEmitter<Option> = new EventEmitter<Option>();

  constructor () {
  }

  onClick () {
    this.checked = true;
    this.onClicked.emit(this.option);
  }

}
