import { Component, OnInit } from '@angular/core';
import { Router,
				 ActivatedRoute, 
				 Params            } from '@angular/router';

import { Assessment        } from '../shared/model/assessment';
import { Student           } from '../shared/model/student';
import { DataService } from '../shared/data.service';


@Component({
	selector: 'qp-assessment',
	templateUrl: 'assessment.component.html',
	styleUrls: ['assessment.component.sass']
})

export class AssessmentComponent implements OnInit {
	studentForm: boolean = false;

	constructor( 
		private dataService: DataService,
		private route: ActivatedRoute,
		private router: Router
	) {
	}

	ngOnInit() {
		this.loadAssessment();
	}

	loadAssessment() {
		let uuid: string = this.route.snapshot.params['uuid'];

		this.dataService.loadAssessment(uuid);
	}

}