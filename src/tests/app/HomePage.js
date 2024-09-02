// @ts-check
import { expect } from '@playwright/test';
import { BasePageNavigation } from '../BasePageNavigation';

export class HomePage extends BasePageNavigation {
  pagePath = '';

  acceptCookiesButton = this.page.getByText('Accept');

  async closeAllWindowsAndClearThePage() {
    // click Accept all cookies
    // await this.acceptCookiesButton.click();

    //
    // click in the center for some reason
    // await this.page.locator('div').filter({ hasText: 'Retrievals made easierToday' }).nth(1).click();
    // close top right corner
    // await page.frameLocator('#hs-overlay-cta-174674345035 [data-test-id="interactive-frame"]').locator('#interactive-close-button').click();
    // close center
    await this.page.getByLabel('close').click();
    // close bottom right
    // await expect(await page.getByRole('dialog', { name: 'Popup CTA' })).toBeVisible();
    // await page.getByRole('dialog', { name: 'Popup CTA' }).locator('internal:control=enter-frame').locator('#interactive-close-button').click();
  }
}
