import { Injectable } from '@angular/core';
import { Response  } from '@angular/http';

import { Student } from '../shared/model/student';
import { Assessment } from '../shared/model/assessment';

import { ASSESSMENTS } from '../shared/mock/assessment-mock';

@Injectable()

export class AssessmentService {
	constructor() {}

	getAssessment(uuid: string): Promise<any> {
		for(let assessment of ASSESSMENTS) {
			if (uuid === assessment.uuid) {
				return Promise.resolve(assessment);
			}
		}

		return Promise.resolve();
	}
}