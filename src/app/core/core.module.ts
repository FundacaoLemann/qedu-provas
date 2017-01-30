import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreService } from './shared/store.service';
import { AssessmentService } from './shared/assessment.service';
import { ApplymentService } from './shared/applyment.service';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './shared/student.service';

@NgModule({
  imports: [
    HttpModule,
    SharedModule
  ],
  declarations: [HeaderComponent, FooterComponent],
  providers: [
    StoreService,
    AssessmentService,
    ApplymentService,
    StudentService
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule {
}
