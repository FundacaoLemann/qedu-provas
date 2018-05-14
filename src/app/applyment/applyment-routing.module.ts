import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentAuthenticationPageComponent } from './pages/student-authentication-page/student-authentication-page.component';
import { SearchAssessmentPageComponent } from './pages/search-assessment-page/search-assessment-page.component';
import { InstructionsPageComponent } from './pages/instructions-page/instructions-page.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { CongratulationsPageComponent } from './pages/congratulations-page/congratulations-page.component';
import { ApplymentComponent } from './applyment.component';

const routes: Routes = [
  {
    path: '', component: ApplymentComponent,
    children: [
      { path: '', component: SearchAssessmentPageComponent },
      { path: 'prova/:token', component: StudentAuthenticationPageComponent },
      { path: 'prova/:token/instrucoes', component: InstructionsPageComponent },
      { path: 'prova/:token/questao/:question_id', component: QuestionPageComponent },
      { path: 'prova/:token/revisao', component: ReviewPageComponent },
      { path: 'prova/:token/parabens', component: CongratulationsPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ApplymentRoutingModule {
}
