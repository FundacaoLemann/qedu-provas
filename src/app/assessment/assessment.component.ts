import { Component, OnInit } from '@angular/core';
import { Router,
				 ActivatedRoute, 
				 Params            } from '@angular/router';

import { Assessment        } from '../model/assessment';
import { Student           } from '../model/student';
import { DataService } from '../data.service';


@Component({
	selector: 'qp-assessment',
	templateUrl: 'assessment.component.html',
	styleUrls: ['assessment.component.sass']
})

export class AssessmentComponent implements OnInit {
	student: Student

	constructor( 
		private dataService: DataService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.dataService.student.subscribe(student => this.student = student);
	}

	ngOnInit() {
		this.loadAssessment();
	}

	loadAssessment() {
		let uuid: string = this.route.snapshot.params['uuid'];

		this.dataService.loadAssessment(uuid);
	}

}