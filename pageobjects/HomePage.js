import { BasePageNavigation } from './BasePageNavigation';

export class HomePage extends BasePageNavigation {
  constructor(page) {
    super(page);
    this.pagePath = ''; // Define the default page path if needed
    this.acceptCookiesButton = this.page.getByText('Accept');
  }

  async closeAllWindowsAndClearThePage() {
    // await this.acceptCookiesButton.click();
    // await this.page.locator('div').filter({ hasText: 'Retrievals made easierToday' }).nth(1).click();
    await this.page.getByLabel('close').click();
  }
}
