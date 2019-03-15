import { Component, OnInit } from '@angular/core';
import { TroubleshootService, BrowserInterface, TroubleshootPayloadInterface } from './troubleshoot-page.service';

@Component({
  selector: 'qp-troubleshoot-page',
  templateUrl: './troubleshoot-page.component.html',
  styleUrls: ['./troubleshoot-page.component.sass'],
  providers: [TroubleshootService],
})
export class TroubleshootPageComponent implements OnInit {
  isBrowserSupported = true;
  currentBrowser: BrowserInterface = {
    name: 'Buscando informações sobre seu navegador',
    version: 0,
  };
  recommendedBrowsers: BrowserInterface[];

  constructor(
    private troubleshootService: TroubleshootService,
  ) {
  }

  ngOnInit() {
    const browserNameAndVersion = this.troubleshootService.getBrowserNameAndVersion(window.navigator.userAgent);
    this.currentBrowser = this.troubleshootService.splitNameAndVersion(browserNameAndVersion);
    this.isBrowserSupported = this.troubleshootService.browserHasSupport(this.currentBrowser);
    this.recommendedBrowsers = this.troubleshootService.recommendedBrowsers;

    const params = new URLSearchParams(window.location.search);
    const payload: TroubleshootPayloadInterface = {
      application: params.get('application'),
      school: params.get('school'),
      cpu: {
        valid: this.isBrowserSupported,
        browser: this.currentBrowser,
      },
    };
    this.troubleshootService.postTroubleshoot(payload);
  }
}
