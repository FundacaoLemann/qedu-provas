import {TroubleshootService} from './troubleshoot-page.service';

describe('TroubleshootService', () => {
  let service: TroubleshootService;

  beforeEach(() => {
    service = new TroubleshootService();
  });

  it('browserHasSupport()', () => {
    const browserMock = {name: 'Chrome', version: 73};
    const negativeNameResult = service.browserHasSupport({...browserMock, name: 'Edge'});
    const negativeVersionResult = service.browserHasSupport({...browserMock, version: 10});
    const positiveResult = service.browserHasSupport(browserMock);

    expect(negativeNameResult).toEqual(false);
    expect(negativeVersionResult).toEqual(false);
    expect(positiveResult).toEqual(true);
  });

  it('splitNameAndVersion()', () => {
    const result = service.splitNameAndVersion('Chrome 73');

    expect(result).toEqual({name: 'Chrome', version: 73});
  });

  it('getBrowserNameAndVersion()', () => {
    const userAgentMock = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3)'
      + ' AppleWebKit/537.36 (KHTML, like Gecko)'
      + ' Chrome/72.0.3626.109 Safari/537.36';
    const result = service.getBrowserNameAndVersion(userAgentMock);

    expect(result).toEqual('Chrome 72');
  });
});
