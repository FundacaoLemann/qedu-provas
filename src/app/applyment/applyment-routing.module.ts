import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentAuthenticationPageComponent } from './student-authentication-page/student-authentication-page.component';
import { SearchAssessmentPageComponent } from './search-assessment-page/search-assessment-page.component';
import { InstructionsPageComponent } from './instructions-page/instructions-page.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { CongratulationsPageComponent } from './congratulations-page/congratulations-page.component';
import { ApplymentComponent } from './applyment.component';

const routes: Routes = [
  {
    path: '', component: ApplymentComponent,
    children: [
      { path: '', component: SearchAssessmentPageComponent },
      { path: 'prova/:uuid', component: StudentAuthenticationPageComponent },
      { path: 'prova/:uuid/instrucoes', component: InstructionsPageComponent },
      { path: 'prova/:uuid/questao/:question_id', component: QuestionPageComponent },
      { path: 'prova/:uuid/revisao', component: ReviewPageComponent },
      { path: 'prova/:uuid/parabens', component: CongratulationsPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ApplymentRoutingModule {
}
