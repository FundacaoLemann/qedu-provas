import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-assessment',
  templateUrl: './search-assessment.component.html',
  styleUrls: ['./search-assessment.component.sass']
})
export class SearchAssessmentComponent implements OnInit {
  uuid: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  formSubmit() {
    // if (this.uuid === '') return;

    this.router.navigate(['prova', this.uuid]);
  }

}
