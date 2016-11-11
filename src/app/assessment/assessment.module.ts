import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssessmentComponent } from './assessment.component';
import { AssessmentService } from './assessment.service';
import { AssessmentRoutingModule } from './assessment-routing.module';

import { StudentFormComponent } from './student-form/student-form.component';
import { ForbiddenCharactersDirective } from './shared/forbidden-characters.directive';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AssessmentRoutingModule
	],
	declarations: [
		AssessmentComponent,
		StudentFormComponent,
		ForbiddenCharactersDirective,
	],
	providers: [
		AssessmentService
	],
	exports: [ AssessmentComponent ]
})

export class AssessmentModule {}