import { Component, OnInit } from '@angular/core';

import { MatrixService } from '../../core/services/matrix/matrix.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'qp-matrix-search-page',
  templateUrl: './matrix-search-page.component.html',
  styleUrls: ['./matrix-search-page.component.sass'],
})
export class MatrixSearchPageComponent implements OnInit {
  public matrixId = '';
  public error = '';
  public submitting = false;

  constructor(private matrixService: MatrixService) {
  }

  ngOnInit() {
  }

  handleSubmit() {
    if (!this.matrixId) {
      return;
    }

    this.setSubmitting(true);
    this.matrixService
      .getMatrix({ id: this.matrixId })
      .pipe(finalize(this.finalizeRequest))
      .subscribe(
        () => {},
        this.setError,
      );
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
