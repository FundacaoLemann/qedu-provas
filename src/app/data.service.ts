import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Assessment } from './model/assessment';
import { AssessmentService } from './assessment/assessment.service';
import { Student } from './model/student';

@Injectable()

export class DataService {
	private assessmentSource$ = new Subject<Assessment>()
	assessment: Observable<Assessment>

	private studentSource$ = new Subject<Student>()
	student: Observable<Student>

  constructor( 
  	private assessmentService: AssessmentService
	) {
  	this.assessment = this.assessmentSource$.asObservable();
  	this.student = this.studentSource$.asObservable();
  }

  loadAssessment(uuid: string): Observable<Assessment> {
  	this.assessmentService.getAssessment(uuid).then((assessment) => {
			this.assessmentSource$.next(assessment);
  	});

  	return this.assessment;
  }

  setStudent(student: Student): void {
    this.studentSource$.next(student);
  }

}
