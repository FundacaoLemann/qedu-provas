import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Assessment } from '../../shared/model/assessment';
import { ASSESSMENTS } from "../../../mocks/assessments-mock";

@Component({
  selector: 'app-instructions-page',
  templateUrl: 'instructions-page.component.html',
  styleUrls: ['instructions-page.component.sass']
})
export class InstructionsPageComponent implements OnInit {
  assessment: Assessment;

  constructor(
  	private router: Router,
  ) { }

  ngOnInit() {
    this.assessment = ASSESSMENTS[0];
  }

  startTimer() {
  }
}
