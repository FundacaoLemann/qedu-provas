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
  isSubmitting = false;
  error = '';

  constructor(
    private stateService: ValidationStateService,
    private matrixService: MatrixService
  ) { }

  ngOnInit() {
    this.matrix = this.stateService.state.matrix;
  }

  handleClick = (eventType: string) => {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    switch (eventType) {
      case 'approve':
        return this.approve();
      case 'requireChanges':
        return this.requireChanges();
      default:
        return null;
    }
  }

  private approve() {
    this.matrixService
      .setMatrixAsApproved(this.matrix)
      .subscribe(
        this.handleSuccess(true),
        this.handleError,
        this.handleCompleted,
      );
  }

  private requireChanges() {
    this.matrixService
      .setMatrixAsRequireChanges(this.matrix)
      .subscribe(
        this.handleSuccess(false),
        this.handleError,
        this.handleCompleted,
      );
  }

  private handleSuccess = (isApproved: boolean) => () => {
    this.approved = isApproved;
  }

  private handleError = (error: Error) => {
    this.error = error.message;
  }

  private handleCompleted = () => {
    this.isSubmitting = false;
  }

}
