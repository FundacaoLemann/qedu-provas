import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '../shared/shared.module';
// Services
import { StoreService } from './store.service';
import { AssessmentService } from './assessment.service';
import { StudentService } from './student.service';
// Components

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    StoreService,
    AssessmentService,
    StudentService,
  ],
  declarations: [
  ],
  exports: [
    SharedModule,
  ]
})
export class CoreModule {
}
