import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {ApplymentComponent} from "./applyment/applyment.component";
import {SearchAssessmentComponent} from "./applyment/search-assessment/search-assessment.component";

@NgModule({
	imports: [
		RouterModule.forRoot([
      { path: '*path', redirectTo: ''}
    ])
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule {}
