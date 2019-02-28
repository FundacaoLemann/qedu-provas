import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'qp-troubleshoot-page',
  templateUrl: './troubleshoot-page.component.html',
  styleUrls: ['./troubleshoot-page.component.sass'],
})
export class TroubleshootPageComponent implements OnInit {
  hideBrowserList = true;
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
    const browserNameAndVersion = this.getBrowserNameAndVersion(window.navigator.userAgent);
    this.currentBrowser = this.splitNameAndVersion(browserNameAndVersion);
    this.hideBrowserList = this.browserHasSupport(this.currentBrowser);
  }

  browserHasSupport(currentBrowser: BrowserInterface): boolean {
    const result = this.recommendedBrowsers
      .filter(({name}) => name === currentBrowser.name)
      .filter(({version}) => version > currentBrowser.version);

    return result.length
      ? true
      : false;
  }

  splitNameAndVersion(browser: string): BrowserInterface {
    const name: string = browser.split(' ')[0];
    const version: string = browser.split(' ')[1];

    return ({
      name,
      version: parseInt(version, 0),
    });
  }

  getBrowserNameAndVersion(userAgent): string {
    let userAgentMatch = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    let temp;

    if (/trident/i.test(userAgentMatch[1])) {
      temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return 'IE ' + (temp[1] || '');
    }

    if (userAgentMatch[1] === 'Chrome') {
      temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
      if (temp !== null) {
        return temp.slice(1).join(' ').replace('OPR', 'Opera');
      }
    }

    userAgentMatch = userAgentMatch[2]
      ? [userAgentMatch[1], userAgentMatch[2]]
      : [navigator.appName, navigator.appVersion, '-?'];

    if ((temp = userAgent.match(/version\/(\d+)/i)) !== null) {
      userAgentMatch.splice(1, 1, temp[1]);
    }

    return userAgentMatch.join(' ');
  }
}

interface BrowserInterface {
  name: string;
  version: number;
}
