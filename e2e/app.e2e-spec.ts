import { QeduProvasNgPage } from './app.po';

describe('qedu-provas-ng App', function() {
  let page: QeduProvasNgPage;

  beforeEach(() => {
    page = new QeduProvasNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
