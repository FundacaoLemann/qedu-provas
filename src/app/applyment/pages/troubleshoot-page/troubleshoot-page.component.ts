import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'qp-troubleshoot-page',
  templateUrl: './troubleshoot-page.component.html',
  styleUrls: ['./troubleshoot-page.component.sass']
})
export class TroubleshootPageComponent implements OnInit {
  currentBrowser: BrowserInterface = {
    name: 'Buscando informações sobre seu navegador',
    version: 0,
  };
  recommendedBrowsers: BrowserInterface[] = [
    {name: 'Chrome', version: 73},
    {name: 'Firefox', version: 60},
  ];

  constructor() {
  }

  ngOnInit() {
  }
}

interface BrowserInterface {
  name: string;
  version: number;
}
