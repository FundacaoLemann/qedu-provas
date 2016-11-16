import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssessmentComponent } from './assessment.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { InstructionsComponent } from './instructions/instructions.component';

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
					},
					{
						path: 'instrucoes',
						component: InstructionsComponent
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