import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AssessmentComponent } from './assessment/assessment.component';

@NgModule({
	imports: [
		RouterModule.forRoot([
			{ path: '', redirectTo: 'prova/DdMRnyqjHN', pathMatch: 'full' },
		])
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule {}