import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'qp-search-assessment-page',
  templateUrl: 'search-assessment-page.component.html',
  styleUrls: ['search-assessment-page.component.sass']
})
export class SearchAssessmentPageComponent implements OnInit {
  form: FormGroup;
  formErrors: string[];

  constructor (private router: Router,
               private fb: FormBuilder) {

    this.form = this.fb.group({
      'uuid': ['', Validators.required]
    });

  }

  ngOnInit () {
  }

  onSubmit () {
    if (this.form.valid) {
      this.router.navigate(['prova', this.form.get('uuid').value]);
    }
  }

}
