import { test } from '@playwright/test';
import { Pages } from '../pageobjects/Pages';
import { CREDENTIALS, FILTERS } from '../utils/constants';
import { DevicesPage } from '../pageobjects/DevicesPage';

test.describe('Device Creation Tests', { tag: '@ui' }, () => {
  let app;
  let devicesPage;

  test.beforeEach(async ({ page }) => {
    app = new Pages(page);
    devicesPage = new DevicesPage(page);
    await app.loginPage.login(CREDENTIALS.USERNAME, CREDENTIALS.PASSWORD);
    await app.homePage.closeAllWindowsAndClearThePage();
  });

  test('should verify device statuses by filter', async ({ page }) => {
    app = new Pages(page);
    await app.homePage.navigateToDevicesPageByUI();

    test.setTimeout(80000);
    await app.devicesPage.applyFilters(FILTERS);
  });
});
