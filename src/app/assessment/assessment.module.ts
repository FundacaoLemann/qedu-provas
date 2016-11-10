import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssessmentComponent } from './assessment.component';
import { AssessmentService } from './assessment.service';
import { AssessmentRoutingModule } from './assessment-routing.module';

import { StudentFormComponent } from './student-form/student-form.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AssessmentRoutingModule
	],
	declarations: [
		AssessmentComponent,
		StudentFormComponent,
	],
	providers: [
		AssessmentService
	],
	exports: [ AssessmentComponent ]
})

export class AssessmentModule {}