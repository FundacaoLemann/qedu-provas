import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assessment } from '../../shared/model/assessment';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ApplymentService } from '../../core/shared/applyment.service';
import { StudentService } from '../../core/shared/student.service';

@Component({
  selector: 'qp-student-form',
  templateUrl: 'student-authentication-page.component.html',
  styleUrls: ['student-authentication-page.component.sass']
})

export class StudentAuthenticationPageComponent implements OnInit {
  student = null;
  assessment: Assessment;
  accessToken: string;
  error: string = '';

  constructor (private assessmentService: AssessmentService,
               private router: Router,
               private route: ActivatedRoute,
               private applymentService: ApplymentService,
               private studentService: StudentService) {
  }

  ngOnInit () {
    this.student = this.applymentService.getStudent() || null;

    this.assessmentService.getAssessment(this.route.snapshot.params['uuid'])
      .subscribe(
        assessment => {
          this.assessment = assessment;
        },
        error => {
          this.assessment = null;
        }
      );
  }

  onSubmit () {
    const setError = () => {
      this.accessToken = '';
      this.error = 'Código inválido';
    };

    if ( !this.student && this.accessToken ) {
      this.fetchUser(this.accessToken)
        .subscribe(
          student => {
            if ( student ) {
              this.student = student;
              this.applymentService.setStudent(student);
              this.error = '';
            }
            else {
              setError();
            }
          },
          error => {
            setError();
          }
        )
    }
  }

  onContinue () {
    if ( this.student ) {
      this.router.navigate(['prova', this.route.snapshot.params['uuid'], 'instrucoes']);
    }
  }

  onCancel () {
    this.accessToken = null;
    this.error = null;
    this.student = null;
  }

  fetchUser (accessToken: string) {
    return this.studentService.getStudentByToken(accessToken);
  }
}

