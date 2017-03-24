import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assessment } from '../../shared/model/assessment';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ApplymentService } from '../shared/applyment.service';
import { StudentService } from '../../core/shared/student.service';

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
              private _router: Router,
              private _route: ActivatedRoute,
              private _applymentService: ApplymentService,
              private _studentService: StudentService) {
  }

  ngOnInit() {
    this.student = this._applymentService.getStudent();
    this.assessment = this._applymentService.getAssessment();

    if ( !this.assessment ) {
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

  onSubmit() {
    const setError = () => {
      this.accessToken = '';
      this.error = 'Código inválido';
    };

    if ( !this.student && this.accessToken ) {
      let assessmentToken = this._applymentService.getAssessment().token;
      this.fetchUser(this.accessToken, assessmentToken)
          .subscribe(
            student => {
              if ( student ) {
                this.student = student;
                this._applymentService.setStudent(student);
                this.error = '';
              } else {
                setError();
              }
            },
            error => {
              setError();
            }
          );
    }
  }

  onContinue() {
    if ( this.student ) {
      this._router.navigate(['prova', this._route.snapshot.params['token'], 'instrucoes']);
    }
  }

  onCancel() {
    this.accessToken = null;
    this.error = null;
    this.student = null;
  }

  fetchUser(studentToken: string, assessmentToken: string) {
    return this._studentService.getStudentByToken(studentToken, assessmentToken);
  }
}

