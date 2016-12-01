import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchAssessmentComponent } from "./search-assessment/search-assessment.component";

const routes: Routes = [
  { path: '', component: SearchAssessmentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ApplymentRoutingModule {
}
