import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'qp-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.sass'],
})
export class LogoComponent implements OnInit {
  @Input() size = 'default';

  private sizeClasses = {
    small: 'small',
    default: 'default',
    large: 'large',
  };

  constructor() {
  }

  ngOnInit() {
  }

  getSizeClass() {
    return this.sizeClasses[this.size] || 'default';
  }
}
