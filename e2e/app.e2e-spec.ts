import { FilmsVehiclesAppPage } from './app.po';

describe('films-vehicles-app App', function() {
  let page: FilmsVehiclesAppPage;

  beforeEach(() => {
    page = new FilmsVehiclesAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
