import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Option } from '../../../../../shared/model/option';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'qp-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.sass'],
})
export class AnswerComponent implements OnInit {
  @Input() option: Option = { id: 0, text: '' };
  @Input() checked = false;
  @Output() onClicked = new EventEmitter<number>();
  optionText: SafeHtml = null;

  constructor(private _sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.optionText = this._sanitizer.bypassSecurityTrustHtml(this.option.text);
  }

  onClick() {
    this.checked = true;
    this.onClicked.emit(this.option.id);
  }
}
