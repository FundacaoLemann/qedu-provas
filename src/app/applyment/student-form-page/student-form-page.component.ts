import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assessment } from '../../shared/model/assessment';
import { FormErrorsParser } from '../../shared/form-errors-parser';
import { StoreService } from '../../core/shared/store.service';
import { AssessmentService } from '../../core/shared/assessment.service';
import { Observable } from 'rxjs';
import { forbiddenCharactersValidator } from '../../shared/directives/forbidden-characters.directive';

@Component({
  selector: 'qp-student-form',
  templateUrl: 'student-form-page.component.html',
  styleUrls: ['student-form-page.component.sass']
})

export class StudentFormPageComponent implements OnInit {
  form: FormGroup;
  formSubmited: boolean = false;
  formErrorMessages: {
    name: '',
    register_number: ''
  };

  assessment: Assessment;

  constructor (private assessmentService: AssessmentService,
               private fb: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private store: StoreService) {

  }

  ngOnInit (): void {
    this.assessmentService.getAssessment('1')
      .subscribe(
        assessment => this.assessment = assessment,
        error => {
          this.assessment = null;
        }
      );

    let student = this.store.getStudentValue();
    this.formBuild(student);

    this.store.student.subscribe(student => {
      this.form.patchValue(student);
    });
  }

  formBuild (student?): void {
    this.form = this.fb.group({
      'name': [
        student.name || '',
        [
          Validators.required,
          forbiddenCharactersValidator(/[\d~`!@#$%^&*()_=+{}[\]|\\:;"'<>,.?/]/g)
        ]
      ],
      'register_number': student.register_number || ''
    });

    this.form.valueChanges.subscribe(() => {
      this.displayErrors(!this.formSubmited);
    });
  }

  onSubmit () {
    this.formSubmited = true;

    if ( this.form.invalid ) {
      this.form.markAsDirty();
      this.displayErrors(false);
    }
    else {
      this.store.setStudent(this.form.getRawValue());
      this.router.navigate(['prova', this.route.snapshot.params['uuid'], 'instructions']);
    }
  }

  displayErrors (dirtyFieldsOnly: boolean): void {
    this.formErrorMessages = FormErrorsParser.parseForm(this.form, dirtyFieldsOnly);
  }

}
