import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'qp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  @Input('logo') logo = true;

  constructor () {
  }

  ngOnInit () {
  }

}
