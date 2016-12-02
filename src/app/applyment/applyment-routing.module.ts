import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StudentFormComponent } from "./student-form/student-form.component";
import { SearchAssessmentComponent } from "./search-assessment/search-assessment.component";
import { InstructionsComponent } from "./instructions/instructions.component";

const routes: Routes = [
  { path: '', component: SearchAssessmentComponent },
  { path: 'prova/:uuid', component: StudentFormComponent },
  { path: 'prova/:uuid/instructions', component: InstructionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ApplymentRoutingModule {
}
