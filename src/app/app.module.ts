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
import { InstructionsComponent } from './assessment/instructions/instructions.component';
import { TimerComponent } from './assessment/timer/timer.component';

import { DataService } from './data.service';
import { TimerService } from './assessment/timer/timer.service';

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
		StudentFormComponent,
		InstructionsComponent,
		TimerComponent
	],
	providers: [DataService, AssessmentService, TimerService],
	bootstrap: [AppComponent]
})


export class AppModule { }