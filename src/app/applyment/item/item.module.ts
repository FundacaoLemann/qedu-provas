import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { QuestionViewComponent } from './question-view/question-view.component';
import { AnswerComponent } from './question-view/answer/answer.component';
import { ProgressionPathComponent } from './progression-path/progression-path.component';
import { CurrentQuestionComponent } from './current-question/current-question.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    QuestionViewComponent,
    AnswerComponent,
    ProgressionPathComponent,
    CurrentQuestionComponent
  ],
  exports: [
    QuestionViewComponent,
    ProgressionPathComponent,
    CurrentQuestionComponent,
  ],
  entryComponents: [QuestionViewComponent],
})
export class ItemModule {}
