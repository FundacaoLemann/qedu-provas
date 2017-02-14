import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreService } from './shared/store.service';
import { AssessmentService } from './shared/assessment.service';
import { ApplymentService } from './shared/applyment.service';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './shared/student.service';
import { ConnectionService } from './shared/connection.service';
import { ConnectionStatusComponent } from './shared/connection-status/connection-status.component';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
  ],
  providers: [
    StoreService,
    AssessmentService,
    ApplymentService,
    StudentService,
    ConnectionService
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ConnectionStatusComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ConnectionStatusComponent
  ]
})
export class CoreModule {
}
