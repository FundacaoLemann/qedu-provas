import { NgModule } from '@angular/core';
import { ApplymentComponent } from './applyment.component';
import { SharedModule } from '../shared/shared.module';
import { ApplymentRoutingModule } from './applyment-routing.module';
import { SearchAssessmentPageComponent } from './search-assessment-page/search-assessment-page.component';
import { SearchAssessmentPageDirective } from './search-assessment-page/search-assessment-page.directive';
import { InstructionsPageComponent } from './instructions-page/instructions-page.component';
import { InstructionsModalComponent } from './instructions-page/modal/instructions-modal.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { AnswerComponent } from './question-page/answer/answer.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ReviewModalComponent } from './review-page/modal/review-modal.component';
import { CurrentQuestionComponent } from './question-page/current-question/current-question.component';
import { CongratulationsPageComponent } from './congratulations-page/congratulations-page.component';
import { CoreModule } from '../core/core.module';
import { StudentAuthenticationPageComponent } from './student-authentication-page/student-authentication-page.component';
import { StudentAuthenticationPageDirective } from './student-authentication-page/student-authentication-page.directive';
import { PageLogosComponent } from './shared/page-logos/page-logos.component';
import { ProgressionPathComponent } from './question-page/progression-path/progression-path.component';
import { NoConnectionModalComponent } from './shared/no-connection-modal/no-connection-modal.component';
import { ApplymentService } from './shared/applyment.service';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';

@NgModule({
  imports: [
    ApplymentRoutingModule,
    SharedModule,
    CoreModule
  ],
  declarations: [
    ApplymentComponent,
    StudentAuthenticationPageComponent,
    StudentAuthenticationPageDirective,
    SearchAssessmentPageComponent,
    SearchAssessmentPageDirective,
    InstructionsPageComponent,
    InstructionsModalComponent,
    QuestionPageComponent,
    AnswerComponent,
    ReviewPageComponent,
    CurrentQuestionComponent,
    CongratulationsPageComponent,
    PageLogosComponent,
    ProgressionPathComponent,
    NoConnectionModalComponent,
    ReviewModalComponent,
    InstructionsModalComponent,
    ErrorModalComponent
  ],
  entryComponents: [
    ReviewModalComponent,
    ErrorModalComponent
  ],
  exports: [
    ApplymentComponent,
  ],
  providers: [
    ApplymentService
  ]
})
export class ApplymentModule {
}
