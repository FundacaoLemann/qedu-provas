import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionViewComponent } from './question-view/question-view.component';
import { AnswerComponent } from './question-view/answer/answer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    QuestionViewComponent,
    AnswerComponent,
  ],
  exports: [
    QuestionViewComponent,
  ]
})
export class ItemModule { }
