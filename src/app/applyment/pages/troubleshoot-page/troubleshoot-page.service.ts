import { Injectable } from '@angular/core';

@Injectable()
export class TroubleshootService {
  recommendedBrowsers: BrowserInterface[] = [
    {name: 'Chrome', version: 67},
    {name: 'Firefox', version: 60},
  ];

  constructor() {
  }

  browserHasSupport(currentBrowser: BrowserInterface): boolean {
    const result = this.recommendedBrowsers
      .filter(({name}) => name === currentBrowser.name)
      .filter(({version}) => version <= currentBrowser.version);

    return result.length > 0
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

export interface BrowserInterface {
  name: string;
  version: number;
}
