import { Component } from '@angular/core';
import snake from '../../utils/snake';

@Component({
  selector: 'qp-congratulations-page',
  templateUrl: './congratulations-page.component.html',
  styleUrls: ['./congratulations-page.component.sass']
})
export class CongratulationsPageComponent {

  constructor() {
  }

  snake() {
    snake('stage');
  }
}
