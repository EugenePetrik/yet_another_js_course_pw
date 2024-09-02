import { expect, test } from '@playwright/test';
import { Pages } from '../pageobjects/Pages';
import { CREDENTIALS, DEVICE } from '../utils/constants';

test.describe('Device Creation Tests', { tag: '@ui' }, () => {
  let app;

  test.beforeEach(async ({ page }) => {
    app = new Pages(page);
    await app.loginPage.login(CREDENTIALS.USERNAME, CREDENTIALS.PASSWORD);
    await app.homePage.closeAllWindowsAndClearThePage();
  });

  test('should create a new device', async ({ page }) => {
    app = new Pages(page);
    await app.homePage.navigateToDevicesPageByUI();
    await app.devicesPage.createDevice(DEVICE);
    expect(await app.devicesPage.isDeviceCreated()).toBeTruthy();
  });
});
