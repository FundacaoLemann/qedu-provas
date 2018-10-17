import { Component, OnInit } from '@angular/core';

import { MatrixService } from '../../../core/services/matrix/matrix.service';
import { finalize } from 'rxjs/operators';
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

  constructor(private matrixService: MatrixService) {
  }

  ngOnInit() {
  }

  handleSubmit(event: Event) {
    if (!this.matrixId) {
      return;
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
}
