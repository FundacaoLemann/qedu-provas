import { Component, OnInit } from '@angular/core';

import { CustomElement } from './custom-elements/custom-element.decorator';

@CustomElement('qp-app')
@Component({
  selector: 'qp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
