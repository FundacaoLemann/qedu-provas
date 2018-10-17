import { Component, OnInit, Input } from '@angular/core';

import { Matrix } from '../../../shared/model/matrix';

@Component({
  selector: 'qp-matrix-info',
  templateUrl: './matrix-info.component.html',
  styleUrls: ['./matrix-info.component.sass']
})
export class MatrixInfoComponent implements OnInit {
  @Input() matrix: Matrix;

  constructor() { }

  ngOnInit() {
  }

}
