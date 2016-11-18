import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomFormErrors } from '../../shared/custom-form-errors';
import { forbiddenCharactersValidator } from '../../shared/forbidden-characters.directive';

import { Student } from '../../shared/model/student';

import { Assessment } from '../../shared/model';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'qp-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})

export class StudentFormComponent implements OnInit {
  assessment: Assessment

  student: Student
  studentForm: FormGroup
  
  formErrors = {};
  formClasses = {};

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.dataService.assessmentObservable.subscribe(assessment => this.assessment = assessment);
    this.dataService.studentObservable.subscribe(student => this.student = student);
  }

  ngOnInit() {
    this.assessment = this.dataService.assessment;
    this.student    = this.dataService.student || new Student();

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
      'register_number': this.student.register_number
  	});

  	this.studentForm.valueChanges.subscribe(data => this.validateForm());
}

  formSubmit() {
    if (this.studentForm.valid) {
      let student =  new Student(
        this.studentForm.get('name').value,
        this.studentForm.get('register_number').value
      );

      this.dataService.setStudent(student);
      this.router.navigate(['instrucoes'], { relativeTo: this.route });
    }
  }

  validateForm(dirtyOnly: boolean = true) {
    this.formErrors = CustomFormErrors.parseForm(this.studentForm, dirtyOnly);
  }
}
