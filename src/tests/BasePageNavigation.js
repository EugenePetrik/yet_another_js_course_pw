// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from './PageHolder';

export class BasePageNavigation extends PageHolder {
  /**
   * @type {string}
   */
  pagePath;

  orgDropdown = this.page.getByLabel('Open').first();

  purchaserDropdown = this.page.getByPlaceholder('Purchaser');

  async gotoDevicesPage() {
    await this.page.goto('cc');
  }

  async navigateToThisPage(path) {
    await this.page.goto(path ?? this.pagePath);
  }

  async selectOrganization(org) {
    // now select ACME
    await this.orgDropdown.click();
    await this.page.getByPlaceholder('Organization').fill(org);
    await this.page.getByRole('option', { name: org, exact: true }).click();
  }

  async selectPurchaser(purchaser) {
    await this.purchaserDropdown.click();
    await this.purchaserDropdown.fill(purchaser);
    await this.page.getByRole('option', { name: purchaser }).click();
  }

  async navigateToDevicesPageByUI() {
    await this.page.getByLabel('account of current user').click();
    await this.page.getByRole('link', { name: 'Devices' }).click();
    await expect(this.page.getByRole('heading', { name: 'Devices' })).toBeVisible();
  }
}
