import { Injectable } from '@angular/core';

import { Assessment } from './model/assessment';
import { ASSESSMENTS } from './mock/assessment-mock';

@Injectable()

export class AssessmentService {
	
	constructor() {}

	getAssessments(): Promise<Assessment[]> {
		return Promise.resolve(ASSESSMENTS);
	}

	getAssessment(uuid: string): Promise<Assessment> {
		for(let assessment of ASSESSMENTS) {
			if(assessment.uuid === uuid)
				return Promise.resolve(assessment);
		} 

		return new Promise<Assessment>(() => { return new Assessment() });
	}

}