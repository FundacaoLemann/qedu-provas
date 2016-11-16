import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ){
  }

  ngOnInit() {
    this.formBuild();

    this.dataService.assessmentObservable.subscribe(assessment => this.assessment = assessment);
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
        this.studentForm.get('register_number').value,
        true
      );

      this.dataService.setStudent(student);
      this.router.navigate(['instrucoes'], { relativeTo: this.route });
    }
  }

  validateForm() {
    this.formErrors = CustomFormErrors.parseForm(this.studentForm);
  }
}
