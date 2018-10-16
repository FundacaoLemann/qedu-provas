import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '../shared/shared.module';
// Services
import { StoreService } from './services/store.service';
import { AssessmentService } from './services/assessment.service';
import { StudentService } from './services/student.service';
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
