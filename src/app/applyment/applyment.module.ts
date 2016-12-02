import { NgModule } from '@angular/core';
import { ApplymentComponent } from './applyment.component';

import { SharedModule } from '../shared/shared.module';
import { ApplymentRoutingModule } from './applyment-routing.module';
import { StudentFormPageComponent } from "./student-form-page/student-form-page.component";
import { SearchAssessmentPageComponent } from "./search-assessment-page/search-assessment-page.component";
import { InstructionsPageComponent } from "./instructions-page/instructions-page.component";

@NgModule({
  imports: [
    ApplymentRoutingModule,
    SharedModule
  ],
  declarations: [
    ApplymentComponent,
    StudentFormPageComponent,
    SearchAssessmentPageComponent,
    InstructionsPageComponent
  ],
  exports: [
    ApplymentComponent,
  ]
})
export class ApplymentModule {
}
