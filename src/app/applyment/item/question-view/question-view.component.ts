import { Component, Injector, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EventEmitter, Output } from '@angular/core';

import { Item } from '../../../shared/model/item';
import { Option } from '../../../shared/model/option';
import { CustomElement } from '../../../../app-lite/custom-elements/custom-element.decorator';

@CustomElement('x-qp-question-view')
@Component({
  selector: 'item-preview',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.sass'],
})
export class QuestionViewComponent implements OnInit {
  @Input() index = 0;
  @Input() title = '';
  @Input() question: Item;
  @Input() answer = 0;

  @Output() selectAnswer = new EventEmitter<number>();

  constructor(private sanitizer: DomSanitizer, private injector: Injector) {}

  ngOnInit() {}

  questionHTML(): SafeHtml {
    let text = '';
    if (this.question) {
      text = this.question.text;

      this.question.media.map(media => {
        switch (media.type) {
          case 'image':
            text = text.replace(
              `{{${media.id}}}`,
              `<p><img class="img-responsive center-block" src="${
                media.source
              }" /></p>`,
            );
            break;
        }
      });
    }

    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  isCorrectOption(option: Option) {
    return option.id === this.answer;
  }

  handleOptionClick(option: number) {
    this.answer = option;
    this.selectAnswer.emit(option);
  }
}
