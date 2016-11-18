import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Assessment } from './model/assessment';
import { Student } from './model/student';

import { AssessmentService } from '../assessment/assessment.service';
import { TimerService } from '../assessment/timer/timer.service';

@Injectable()

export class DataService {
	private assessmentSource$ = new Subject<Assessment>()
	assessmentObservable: Observable<Assessment>
  assessment: Assessment

	private studentSource$ = new Subject<Student>()
	studentObservable: Observable<Student>
  student: Student

  constructor( 
  	private assessmentService: AssessmentService,
    private router: Router,
    private timer: TimerService
	) {
  	this.assessmentObservable = this.assessmentSource$.asObservable();
  	this.studentObservable = this.studentSource$.asObservable();
  }

  loadAssessment(uuid: string): Observable<Assessment> {
  	this.assessmentService.getAssessment(uuid).then((assessment) => {
			this.assessmentSource$.next(assessment);
      this.assessment = assessment;

      this.timer.setTimer(this.assessment.duration);
  	});

  	return this.assessmentObservable;
  }

  setStudent(student: Student): void {
    this.studentSource$.next(student);
    this.student = student;
  }

}
