import { SvenskaMeningarPage } from './app.po';

describe('svenska-meningar App', function() {
  let page: SvenskaMeningarPage;

  beforeEach(() => {
    page = new SvenskaMeningarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
