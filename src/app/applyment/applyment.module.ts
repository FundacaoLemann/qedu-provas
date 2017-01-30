import { NgModule } from '@angular/core';
import { ApplymentComponent } from './applyment.component';
import { SharedModule } from '../shared/shared.module';
import { ApplymentRoutingModule } from './applyment-routing.module';
import { SearchAssessmentPageComponent } from './search-assessment-page/search-assessment-page.component';
import { InstructionsPageComponent } from './instructions-page/instructions-page.component';
import { InstructionsModalComponent } from './instructions-page/modal/instructions-modal.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { AnswerComponent } from './question-page/answer.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ReviewModalComponent } from './review-page/modal/review-modal.component';
import { CurrentQuestionComponent } from './question-page/current-question.component';
import { CongratulationsPageComponent } from './congratulations-page/congratulations-page.component';
import { CoreModule } from '../core/core.module';
import { StudentAuthenticationPageComponent } from './student-authentication-page/student-authentication-page.component';
import { PageLogosComponent } from './shared/page-logos/page-logos.component';

@NgModule({
  imports: [
    ApplymentRoutingModule,
    SharedModule,
    CoreModule
  ],
  declarations: [
    ApplymentComponent,
    StudentAuthenticationPageComponent,
    SearchAssessmentPageComponent,
    InstructionsPageComponent,
    InstructionsModalComponent,
    QuestionPageComponent,
    AnswerComponent,
    ReviewPageComponent,
    ReviewModalComponent,
    CurrentQuestionComponent,
    CongratulationsPageComponent,
    PageLogosComponent,
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
