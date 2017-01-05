import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreService } from './shared/store.service';
import { AssessmentService } from './shared/assessment.service';
import { ApplymentService } from './shared/applyment.service';

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: [],
  providers: [
    StoreService,
    AssessmentService,
    ApplymentService
  ]
})
export class CoreModule {
}
