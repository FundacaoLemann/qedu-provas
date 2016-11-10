import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Student } from '../model/student';
import { Validator, Validations } from '../shared/validator';

@Component({
  selector: 'qp-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})

export class StudentFormComponent implements AfterViewChecked {
	
  student: Student = new Student()
  studentForm: NgForm;

  @ViewChild('studentForm') viewForm: NgForm;

  ngAfterViewChecked() {
    this.setupForm();
  }

  setupForm() {
    if( this.studentForm === this.viewForm) { return; }

    this.studentForm = this.viewForm;
    this.studentForm.valueChanges.
      subscribe(data => this.formChanged(data));
  }

  formChanged(data?: any) {
    let errors: string[];
    if (! this.studentForm.pristine) {
      this.formErrors.name = Validator.validate(this.student.name, 
        { validations: {
            required: true, 
            length: {min: 2},
            invalidCharacters: /[~`!@#$%^&*()_+={}[\]|\\:;"'<>,./?\d]/g
          }
        }).join('<br>');
    }
  }

  formErrors = {
    'name': '',
    'register_number': ''
  }

}
