import { NgModule } from '@angular/core';
import { ApplymentComponent } from './applyment.component';

import { SharedModule } from '../shared/shared.module';
import { ApplymentRoutingModule } from './applyment-routing.module';
import { StudentFormPageComponent } from "./student-form-page/student-form-page.component";
import { SearchAssessmentPageComponent } from "./search-assessment-page/search-assessment-page.component";
import { InstructionsPageComponent } from "./instructions-page/instructions-page.component";
import { InstructionsModalComponent } from './instructions-page/instructions-modal.component';
import { QuestionPageComponent } from "./question-page/question-page.component";
import { AnswerComponent } from './question-page/answer.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ReviewModalComponent } from './review-page/review-modal.component';
import { CurrentQuestionComponent } from './question-page/current-question.component';
import { CongratulationsPageComponent } from './congratulations-page/congratulations-page.component';

@NgModule({
  imports: [
    ApplymentRoutingModule,
    SharedModule
  ],
  declarations: [
    ApplymentComponent,
    StudentFormPageComponent,
    SearchAssessmentPageComponent,
    InstructionsPageComponent,
    InstructionsModalComponent,
    QuestionPageComponent,
    AnswerComponent,
    ReviewPageComponent,
    ReviewModalComponent,
    CurrentQuestionComponent,
    CongratulationsPageComponent,
  ],
  entryComponents: [
    ReviewModalComponent,
    InstructionsModalComponent
  ],
  exports: [
    ApplymentComponent,
  ]
})
export class ApplymentModule {
}
