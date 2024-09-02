// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../src/tests/PageHolder.js';

export class BasePageNavigation extends PageHolder {
  constructor(page) {
    super(page);
    this.pagePath = ''; // Default path, can be overridden by subclasses
    this.orgDropdown = this.page.getByLabel('Open').first();
    this.purchaserDropdown = this.page.getByPlaceholder('Purchaser');
  }

  async gotoDevicesPage() {
    await this.page.goto('cc'); // Replace 'cc' with the correct URL or path
  }

  async navigateToThisPage(path) {
    await this.page.goto(path ?? this.pagePath);
  }

  async selectOrganization(org) {
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
