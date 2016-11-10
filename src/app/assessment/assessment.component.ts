import { Component, OnInit } from '@angular/core';
import { Router,
				 ActivatedRoute, 
				 Params            } from '@angular/router';

import { Assessment        } from './model/assessment';
import { AssessmentService } from './assessment.service';
import { Student           } from './model/student';


@Component({
	selector: 'qp-assessment',
	templateUrl: 'assessment.component.html',
	styleUrls: ['assessment.component.sass']
})

export class AssessmentComponent implements OnInit {
	constructor( 
		private assessmentService: AssessmentService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	assessment: Assessment;
	student: Student;

	ngOnInit() {
		this.getAssessment();
	}

	getAssessment() {
		let uuid = this.route.snapshot.params['uuid'];
		this.assessmentService.getAssessment(uuid).then(assessment => {
			this.assessment = assessment;
		});
	}
}