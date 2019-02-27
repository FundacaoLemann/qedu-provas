import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'qp-troubleshoot-page',
  templateUrl: './troubleshoot-page.component.html',
  styleUrls: ['./troubleshoot-page.component.sass']
})
export class TroubleshootPageComponent implements OnInit {
  currentBrowser: BrowserInterface = {
    name: 'Chrome',
    version: 73,
  };
  recommendedBrowsers: BrowserInterface[] = [
    {name: 'Chrome', version: 72},
    {name: 'Safari', version: 12},
    {name: 'Edge', version: 18},
    {name: 'Firefox', version: 65},
    {name: 'Internet Explorer', version: 11},
    {name: 'Opera', version: 57},
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
