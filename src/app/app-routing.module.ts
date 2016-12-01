import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {ApplymentComponent} from "./applyment/applyment.component";
import {StudentFormComponent} from "./applyment/search-assessment/search-assessment.component";

@NgModule({
	imports: [
		RouterModule.forRoot([
    ])
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule {}
