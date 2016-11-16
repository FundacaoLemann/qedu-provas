import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Student } from '../../model/student';

import { CustomFormErrors, forbiddenCharactersValidator } from '../../shared';

import { Assessment } from '../../model';
import { DataService } from '../../data.service';

@Component({
  selector: 'qp-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})

export class StudentFormComponent implements OnInit {
  assessment: Assessment

  student: Student = new Student()
  studentForm: FormGroup
  
  formErrors = {};
  formClasses = {};

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ){
  }

  ngOnInit() {
    this.formBuild();

    this.dataService.assessment.subscribe(assessment => this.assessment = assessment);
  }

  formBuild() {
  	this.studentForm = this.fb.group({
  		'name': [
  			this.student.name, [
	  			Validators.required,
	  			forbiddenCharactersValidator(/[~`!@#$%^&*()_+={}[\]|\\:;"<>,./?\d]/g)
	  		]
  		],
      'register_number': []
  	});

  	this.studentForm.valueChanges.subscribe(data => this.validateForm());
  }

  formSubmit() {
    if (this.studentForm.valid) {
      let student =  new Student(
        this.studentForm.get('name').value,
        this.studentForm.get('register_number').value
      );
      console.log('passou');

      this.dataService.setStudent(student);
    }
  }

  validateForm() {
    this.formErrors = CustomFormErrors.parseForm(this.studentForm);
  }
}
