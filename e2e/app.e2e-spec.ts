import { ScheduleWebMaterialPage } from './app.po';

describe('schedule-web-material App', () => {
  let page: ScheduleWebMaterialPage;

  beforeEach(() => {
    page = new ScheduleWebMaterialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
