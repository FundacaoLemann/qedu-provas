import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'qp-panel-page',
  templateUrl: './panel-page.component.html',
  styleUrls: ['./panel-page.component.sass'],
})
export class PanelPageComponent implements OnInit, AfterViewInit {
  @ViewChild('footerContainer') private footer: ElementRef<HTMLElement>;
  @Input() small = true;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log(this.footer);
  }

  footerStyle(): string {
    if (!this.footer) {
      return 'none';
    }

    return this.footer.nativeElement.innerHTML.trim() ? 'block' : 'none';
  }

}
