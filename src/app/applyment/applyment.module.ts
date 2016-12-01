import { NgModule } from '@angular/core';
import { ApplymentComponent } from './applyment.component';

import {SharedModule} from '../shared/shared.module';
import {SearchAssessmentComponent} from './search-assessment/search-assessment.component';
import {ApplymentRoutingModule} from './applyment-routing.module';

@NgModule({
  imports: [
    ApplymentRoutingModule,
    SharedModule
  ],
  declarations: [
    ApplymentComponent,
    SearchAssessmentComponent
  ],
  exports: [
    ApplymentComponent,
    SearchAssessmentComponent
  ]
})
export class ApplymentModule { }
