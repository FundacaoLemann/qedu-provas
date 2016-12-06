import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Answer } from '../../shared/model/answer';

@Component({
  selector: 'qp-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.sass']
})
export class AnswerComponent implements OnInit {
  @Input() answer: Answer = { id: 0, text: '' };
  @Input() checked: boolean = false;
  @Output() onClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor () {
  }

  ngOnInit () {
  }

  onClick () {
    this.checked = true;
    this.onClicked.emit(this.answer.id);
  }

}
