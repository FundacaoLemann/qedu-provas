import { NgModule } from '@angular/core';
import { ApplymentComponent } from './applyment.component';

import { SharedModule } from '../shared/shared.module';
import { ApplymentRoutingModule } from './applyment-routing.module';
import { StudentFormComponent } from "./student-form/student-form.component";
import { SearchAssessmentComponent } from "./search-assessment/search-assessment.component";

@NgModule({
  imports: [
    ApplymentRoutingModule,
    SharedModule
  ],
  declarations: [
    ApplymentComponent,
    StudentFormComponent,
    SearchAssessmentComponent
  ],
  exports: [
    ApplymentComponent,
    StudentFormComponent
  ]
})
export class ApplymentModule {
}
