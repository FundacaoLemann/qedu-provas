import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Student } from '../model/student';

import { forbiddenCharactersValidator } from '../shared';
import { CustomFormErrors } from '../shared';

@Component({
  selector: 'qp-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})

export class StudentFormComponent implements OnInit {

	constructor(private fb: FormBuilder){}
	
  student: Student = new Student()
  studentForm: FormGroup;

  formErrors = {};
  formClasses = {};

  ngOnInit() {
  	this.formBuild();
  }

  formBuild() {
  	this.studentForm = this.fb.group({
  		'name': [
  			this.student.name, [
	  			Validators.required,
	  			forbiddenCharactersValidator(/[~`!@#$%^&*()_+={}[\]|\\:;"<>,./?\d]/g)
	  		]
  		],
      'register_number' : [
        this.student.register_number, Validators.required
      ]
  	});

  	this.studentForm.valueChanges
  		.subscribe(data => this.onValueChanged(data));
  }

  updateFormClasses() {
    for(let controlName in this.studentForm.controls) {
      let control = this.studentForm.controls[controlName];

      if ( control.dirty && ! control.valid ) {
        this.formClasses[controlName] = 'invalid';
      }
      else if ( control.dirty && control.valid ) {
        this.formClasses[controlName] = 'valid';
      }
    }

  }

  onValueChanged(data?: any) {
    this.formErrors = CustomFormErrors.parseForm(this.studentForm);
    this.updateFormClasses();
  }
}
