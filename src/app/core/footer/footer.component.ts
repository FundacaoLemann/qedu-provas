import { Component, Input } from '@angular/core';

@Component({
  selector: 'qp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  @Input() disclaimer: string;

  constructor() {
    this.disclaimer = 'QEdu 2016. Todos os direitos reservados.';
  }

}
