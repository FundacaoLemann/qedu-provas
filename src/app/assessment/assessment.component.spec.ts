import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By                        } from '@angular/platform-browser';
import { DebugElement              } from '@angular/core';

import { Assessment                } from './model/assessment';
import { AssessmentService         } from './assessment.service';
import { AssessmentComponent       } from './assessment.component';
import { ASSESSMENTS               } from './mock/assessment-mock';

let comp              : AssessmentComponent;
let fixture           : ComponentFixture<AssessmentComponent>;
let de                : DebugElement;
let el                : HTMLElement;
let assessmentService : AssessmentService;
let spy               : any;

describe('AssessmentComponent', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AssessmentComponent],
			providers: [AssessmentService]
		});
 
		fixture = TestBed.createComponent(AssessmentComponent);

		comp = fixture.componentInstance;

		assessmentService = fixture.debugElement.injector.get(AssessmentService)

		spy = spyOn(assessmentService, 'getAssessment')
					.and.returnValue(Promise.resolve(ASSESSMENTS[0]));

		// de = fixture.debugElement.query()

	});

	it('should instantiate an Assessment object', () => {
		comp.ngOnInit().then(() => {
			expect(comp.assessment).toEqual(new Assessment());
		});
	});
});