import {Component, OnInit} from '@angular/core';
import snake from '../../utils/snake';
import {ApplymentService} from '../shared/applyment.service';

@Component({
  selector: 'qp-congratulations-page',
  templateUrl: './congratulations-page.component.html',
  styleUrls: ['./congratulations-page.component.sass']
})
export class CongratulationsPageComponent implements OnInit {

  constructor(public applymentService: ApplymentService) {
  }

  ngOnInit() {
    this.applymentService.resetInitialState();
  }

  snake() {
    snake('stage');
  }
}
