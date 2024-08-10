// @ts-check
import { test } from '@playwright/test';
import { Pages } from '../app/Pages';

export const baseFixture = test.extend({
  app: async ({ browser, page }, use) => {
    test.info().annotations.push({
      type: 'Browser',
      description: `${browser.browserType().name()} ${browser.version()}`,
    });

    const fixturePage = new Pages(page);

    await use(fixturePage);
  },
});
