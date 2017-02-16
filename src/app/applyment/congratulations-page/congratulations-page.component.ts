import { Component, OnInit } from '@angular/core';
import snake from '../../utils/snake';

@Component({
  selector: 'qp-congratulations-page',
  templateUrl: './congratulations-page.component.html',
  styleUrls: ['./congratulations-page.component.sass']
})
export class CongratulationsPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  snake() {
    snake('stage');
  }
}
