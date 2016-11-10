import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssessmentComponent } from './assessment.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: 'prova/:uuid', component: AssessmentComponent},
			// { path: 'prova/:uuid/instrucoes', component: }
		])
	],
	exports: [RouterModule]
})

export class AssessmentRoutingModule {}
