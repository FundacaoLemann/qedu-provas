import { Component, OnInit } from '@angular/core';

import { Matrix } from '../../../shared/model/matrix';
import { ValidationStateService } from '../../services/validation-state.service';

@Component({
  selector: 'qp-approval-page',
  templateUrl: './approval-page.component.html',
  styleUrls: ['./approval-page.component.sass'],
})
export class ApprovalPageComponent implements OnInit {
  approved: boolean = null;
  matrix: Matrix;

  constructor(protected stateService: ValidationStateService) {
  }

  ngOnInit() {
    this.matrix = this.stateService.state.matrix;
  }

  setApproved = (approved: boolean) => {
    this.approved = approved;
  }
}
