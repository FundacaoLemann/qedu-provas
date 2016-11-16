import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssessmentComponent } from './assessment.component';
import { StudentFormComponent } from './student-form/student-form.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ 
				path: 'prova/:uuid', 
				component: AssessmentComponent,
				children: [
					{
						path: '',
						component: StudentFormComponent,
					}
				]
			}
		])
	],
	exports: [
		RouterModule
	]
})

export class AssessmentRoutingModule {}