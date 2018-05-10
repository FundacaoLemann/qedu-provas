import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EventEmitter, Output } from '@angular/core';

import { Item } from '../../../shared/model/item';
import Answer from '../../../shared/model/answer';
import { Option } from '../../../shared/model/option';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.sass'],
})
export class QuestionViewComponent implements OnInit {
  @Input() question: Item;
  @Input() answer: Answer;
  @Output() selectAnswer = new EventEmitter<number>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  questionHTML(): SafeHtml {
    let questionText = this.question.text;

    this.question.media.map(media => {
      switch (media.type) {
        case 'image':
          questionText = questionText.replace(
            `{{${media.id}}}`,
            `<p><img class="img-responsive center-block" src="${
              media.source
            }" /></p>`,
          );
          break;
      }
    });

    return this.sanitizer.bypassSecurityTrustHtml(questionText);
  }

  isCorrectOption(option: Option) {
    return option.id === this.answer.optionId;
  }

  handleOptionClick(optionId: number) {
    this.selectAnswer.emit(optionId);
  }
}
