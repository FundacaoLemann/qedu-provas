import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AssessmentModule } from './assessment/assessment.module';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule,
		AppRoutingModule,
		AssessmentModule
	],
	declarations: [
		AppComponent,
	],
	providers: [],
	bootstrap: [AppComponent]
})


export class AppModule { }