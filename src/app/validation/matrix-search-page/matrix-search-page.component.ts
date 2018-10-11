import { Component, OnInit } from '@angular/core';
import { MatrixService } from '../../core/services/matrix/matrix.service';

@Component({
  selector: 'qp-matrix-search-page',
  templateUrl: './matrix-search-page.component.html',
  styleUrls: ['./matrix-search-page.component.sass']
})
export class MatrixSearchPageComponent implements OnInit {
  public matrixId = '';

  constructor(private matrixService: MatrixService) { }

  ngOnInit() {
  }

  handleSubmit(event: Event) {
    this.matrixService
      .getMatrix({ id: this.matrixId })
      .subscribe(data => console.log(data));
  }
}
