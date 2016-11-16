import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AssessmentRoutingModule } from './assessment/assessment-routing.module';

import { AppComponent } from './app.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { StudentFormComponent } from './assessment/student-form/student-form.component';

import { AssessmentService } from './assessment/assessment.service';
import { DataService } from './data.service';

@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpModule,
		AppRoutingModule,
		AssessmentRoutingModule
	],
	declarations: [
		AppComponent,
		AssessmentComponent,
		StudentFormComponent
	],
	providers: [DataService, AssessmentService],
	bootstrap: [AppComponent]
})


export class AppModule { }