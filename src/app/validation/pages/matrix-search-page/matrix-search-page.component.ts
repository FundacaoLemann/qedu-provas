import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ValidationStateService } from '../../services/validation-state.service';
import { MatrixService } from '../../../core/services/matrix/matrix.service';
import { Matrix } from '../../../shared/model/matrix';

@Component({
  selector: 'qp-matrix-search-page',
  templateUrl: './matrix-search-page.component.html',
  styleUrls: ['./matrix-search-page.component.sass'],
})
export class MatrixSearchPageComponent implements OnInit {
  public matrixId = '';
  public error = '';
  public submitting = false;

  public matrix: Matrix;

  constructor(
    private router: Router,
    private stateService: ValidationStateService,
    private matrixService: MatrixService
  ) { }

  ngOnInit() {
  }

  handleSubmit(event: Event) {
    if (!this.matrixId) {
      return;
    }

    if (this.matrix) {
      return this.redirectToItem();
    }

    this.matrix = null;
    this.setSubmitting(true);
    this.matrixService
      .getMatrix({ id: this.matrixId })
      .pipe(finalize(this.finalizeRequest))
      .subscribe(
        this.setMatrix,
        this.setError,
      );
  }

  setMatrix = (matrix: Matrix) => {
    this.stateService.setState({ matrix });
    this.matrix = matrix;
  }

  setError = (error: Error) => {
    this.error = error.message;
  }

  setSubmitting = (state: boolean) => {
    this.submitting = state;
  }

  finalizeRequest = () => {
    this.setSubmitting(false);
  }

  private redirectToItem() {
    this.router.navigateByUrl(`validacao/${this.matrix.id}/item/1`);
  }
}
