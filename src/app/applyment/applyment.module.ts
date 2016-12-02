import { NgModule } from '@angular/core';
import { ApplymentComponent } from './applyment.component';

import { SharedModule } from '../shared/shared.module';
import { ApplymentRoutingModule } from './applyment-routing.module';
import { StudentFormComponent } from "./student-form/student-form.component";
import { SearchAssessmentComponent } from "./search-assessment/search-assessment.component";
import { InstructionsComponent } from "./instructions/instructions.component";

@NgModule({
  imports: [
    ApplymentRoutingModule,
    SharedModule
  ],
  declarations: [
    ApplymentComponent,
    StudentFormComponent,
    SearchAssessmentComponent,
    InstructionsComponent
  ],
  exports: [
    ApplymentComponent,
  ]
})
export class ApplymentModule {
}
