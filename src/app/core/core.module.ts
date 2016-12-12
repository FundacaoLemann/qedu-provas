import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreService } from './shared/store.service';
import { AssessmentService } from './shared/assessment.service';

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: [],
  providers: [
    StoreService,
    AssessmentService
  ]
})
export class CoreModule {
}
