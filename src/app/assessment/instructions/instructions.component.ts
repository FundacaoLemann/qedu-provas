import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Assessment } from '../../model/assessment';
import { DataService } from '../../data.service';

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
  ){
    this.assessment = this.dataService.assessment;
  }

  ngOnInit() {
  }
}
