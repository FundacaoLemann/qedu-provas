import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StudentFormPageComponent } from "./student-form-page/student-form-page.component";
import { SearchAssessmentPageComponent } from "./search-assessment-page/search-assessment-page.component";
import { InstructionsPageComponent } from "./instructions-page/instructions-page.component";

const routes: Routes = [
  { path: '', component: SearchAssessmentPageComponent },
  { path: 'prova/:uuid', component: StudentFormPageComponent },
  { path: 'prova/:uuid/instructions', component: InstructionsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ApplymentRoutingModule {
}
