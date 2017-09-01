import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../../core/shared/assessment.service';
import { StudentService } from '../../core/shared/student.service';
import { Assessment } from '../../shared/model/assessment';
import { Student } from '../../shared/model/student';
import { ApplymentService } from '../shared/applyment.service';
import { AnalyticsService } from '../../core/shared/analytics.service';

@Component({
  selector: 'qp-student-form',
  templateUrl: 'student-authentication-page.component.html',
  styleUrls: ['student-authentication-page.component.sass']
})

export class StudentAuthenticationPageComponent implements OnInit {
  student = null;
  error = '';
  assessment: Assessment;
  accessToken: string;

  constructor(private _assessmentService: AssessmentService,
              private _analyticsService: AnalyticsService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _applymentService: ApplymentService,
              private _studentService: StudentService) {
  }

  ngOnInit() {
    this.student = this._applymentService.getStudent();
    this.assessment = this._applymentService.getAssessment();


    if ( !this.assessment.token ) {
      const token = this._route.snapshot.params['token'];
      this._assessmentService
        .fetchAssessment(token)
        .subscribe(
          assessment => {
            this.assessment = assessment;
            this._applymentService.setAssessment(assessment);
          },
          error => this.assessment = null
        );
    }
  }

  setFormError(error: Error) {
    this.accessToken = '';
    this.error = error.message;
  }

  setStudentData(student: Student) {
    student.token = this.accessToken;
    this.student = student;
    this._applymentService.setStudent(student);
    this.error = '';
    this._analyticsService.setStudentToken(this.student.token)
  }

  onSubmit() {
    if ( !this.student.token && this.accessToken ) {
      const assessmentToken = this._applymentService.getAssessment().token;

      this.fetchUser(this.accessToken, assessmentToken)
        .subscribe(
          this.setStudentData.bind(this),
          this.setFormError.bind(this)
        );
    }
  }

  onContinue() {
    if ( this.student.token ) {
      this._router.navigate(['prova', this._route.snapshot.params['token'], 'instrucoes']);
    }
  }

  onCancel() {
    this.accessToken = null;
    this.error = null;
    this.student = {};
  }

  fetchUser(studentToken: string, assessmentToken: string) {
    return this._studentService.getStudentByToken(studentToken, assessmentToken);
  }
}

