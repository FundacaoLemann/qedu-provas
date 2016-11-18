import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Assessment } from '../../shared/model/assessment';
import { DataService } from '../../shared/data.service';
import { TimerService } from '../timer/timer.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.sass']
})
export class InstructionsComponent implements OnInit {
	assessment: Assessment

  constructor(
  	private router: Router,
  	private dataService: DataService,
    private timer: TimerService
  ) {
  }

  ngOnInit() {
    this.assessment = this.dataService.assessment;
  }

  startTimer() {
    this.timer.start();
  }
}
