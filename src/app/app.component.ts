import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'qp-app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.sass']
})

export class AppComponent implements OnInit {
	constructor(
	) {}

	current_date: Date;

	ngOnInit() {
		this.current_date = new Date();
	}
}
