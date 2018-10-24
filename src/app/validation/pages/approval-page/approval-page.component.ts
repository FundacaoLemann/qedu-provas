import { Component, OnInit } from '@angular/core';

import { Matrix } from '../../../shared/model/matrix';
import { ValidationStateService } from '../../services/validation-state.service';
import { MatrixService } from '../../../core/services/matrix/matrix.service';

@Component({
  selector: 'qp-approval-page',
  templateUrl: './approval-page.component.html',
  styleUrls: ['./approval-page.component.sass'],
})
export class ApprovalPageComponent implements OnInit {
  approved: boolean = null;
  matrix: Matrix;

  constructor(
    private stateService: ValidationStateService,
    private matrixService: MatrixService,
  ) { }

  ngOnInit() {
    this.matrix = this.stateService.state.matrix;
  }

  approve() {
    this.approved = true;
    // this.matrixService.setMatrixAsApproved(this.matrix);
  }

  requestChanges() {
  }
}
