import { AssessmentService } from './assessment.service';
import { ASSESSMENTS } from './mock/assessment-mock';

let service: AssessmentService;

describe('AssessmentService', () => {

	beforeEach(() => { service = new AssessmentService() });

	it('should get all assessments', () => {
		service.getAssessments().then((assessments) => {
			expect(assessments).toEqual(ASSESSMENTS);
		});
	});

	it('should return an assessment by the uuid', () => {
		service.getAssessment('DdMRnyqjHN').then(assessment => expect(assessment).toEqual(ASSESSMENTS[0]));
		service.getAssessment('qaQJDBHRyL').then(assessment => expect(assessment).toEqual(ASSESSMENTS[1]));
	});

	it('should return an empty assessment', () => {
		service.getAssessment('').then(assessment => expect(assessment.uuid).not.toBeDefined);
	});

});