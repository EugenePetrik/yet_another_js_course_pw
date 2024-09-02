import { expect, test } from '@playwright/test';
import { Pages } from '../pageobjects/Pages';
import { CREDENTIALS, DEVICE } from '../utils/constants';

const fs = require('fs');
const path = require('path');

test.describe('Device Creation Tests', { tag: '@ui' }, () => {
  let app;

  test.beforeEach(async ({ page }) => {
    app = new Pages(page);
    await app.loginPage.login(CREDENTIALS.USERNAME, CREDENTIALS.PASSWORD);
    await app.homePage.closeAllWindowsAndClearThePage();
  });

  test('should verify snapshot', async ({ page }) => {
    app = new Pages(page);
    await app.homePage.navigateToDevicesPageByUI();

    await page.getByPlaceholder('Search by serial number').fill(DEVICE.SERIAL_NUMBER);

    const screenshotPath = path.resolve('screenshots', 'current_screenshot.png');
    await page.screenshot({ path: screenshotPath });

    const baselinePath = path.resolve('baseline_images', 'baseline.png');
    const baselineImage = fs.readFileSync(baselinePath);

    const currentScreenshot = fs.readFileSync(screenshotPath);

    const pixelmatch = require('pixelmatch');
    const { PNG } = require('pngjs');
    const img1 = PNG.sync.read(currentScreenshot);
    const img2 = PNG.sync.read(baselineImage);

    const diff = new PNG({ width: img1.width, height: img1.height });
    const mismatchedPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });

    expect(mismatchedPixels).toBe(0);
  });
});
