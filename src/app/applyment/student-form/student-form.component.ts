import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Student } from '../../shared/model/student';
import { Assessment } from "../../shared/model/assessment";
import { FormErrorsParser } from "../../shared/form-errors-parser";
import { forbiddenCharactersValidator } from "../../shared/directives/forbidden-characters.directive";
import { ASSESSMENTS } from "../../shared/mock/assessment-mock";
import { StoreService } from "../../core/shared/store.service";

@Component({
  selector: 'qp-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})

export class StudentFormComponent implements OnInit {
  form: FormGroup;
  formSubmited: boolean = false;
  formErrorMessages: {
    name: '',
    register_number: ''
  };

  assessment: Assessment;

  constructor (private fb: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private store: StoreService) {

    this.assessment = ASSESSMENTS[0];
  }

  ngOnInit (): void {
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

    if (this.form.invalid) {
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
