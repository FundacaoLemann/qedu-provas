import { Component, Input } from '@angular/core';

@Component({
  selector: 'qp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  @Input() disclaimer: string;

  constructor() {
    this.disclaimer = '© 2017 QEdu: Use dados. Transforme a educação.';
  }

}
