import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-search-assessment',
  templateUrl: './search-assessment.component.html',
  styleUrls: ['./search-assessment.component.sass']
})
export class SearchAssessmentComponent implements OnInit {
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
    if (this.form.valid)
      this.router.navigate(['prova', this.form.get('uuid').value]);
  }

}
