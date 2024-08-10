// @ts-check
import { expect, test } from '@playwright/test';

test.describe('Simon Smith app basic tests (without page objects)', { tag: '@ui' }, () => {
  const username = 'ovartem';

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('/github-user-search/#/search');
  });

  test('should perform search', async ({ page }) => {
    // Act
    await page.locator('#searchInput').fill(username);
    await page.locator('#searchInput').press('Enter');

    // Assertion
    await expect(page.locator('[class^="SearchResults_item"]'), 'Search Results is empty').not.toHaveCount(0);

    // Option 1
    const names = await page.locator('[class^="SearchResults_item"]').allInnerTexts();
    expect(names, 'Username is not correct').toContain(username);

    // Option 2
    await expect(page.locator('[class^="SearchResults_item"]'), 'Username is not correct').toContainText([username]);
  });

  test('should open user profile', async ({ page }) => {
    // Act
    await page.locator('#searchInput').fill(username);
    await page.locator('#searchInput').press('Enter');
    await page
      .locator('[class^="SearchResults_item"]')
      .filter({ hasText: new RegExp(`^${username}$`) })
      .click();

    // Assertion
    await expect(page.locator('[class^="ProfileTitle_name"]')).toHaveText('Artem Ovcharenko');
    await expect(page.locator('[class^="ProfileTitle_username"]')).toHaveText(`@${username}`);

    await expect(page.locator('[class^="Repo_name"]')).toContainText([
      'wdio_tests_with_po',
      'playwright_tests_with_po',
    ]);
  });

  test('should open playwright_tests_with_po repository', async ({ page }) => {
    // Act
    await page.locator('#searchInput').fill(username);
    await page.locator('#searchInput').press('Enter');
    await page
      .locator('[class^="SearchResults_item"]')
      .filter({ hasText: new RegExp(`^${username}$`) })
      .click();

    await expect(page.locator('[class^="Repo_name"] a')).not.toHaveCount(0);
    await page.locator('[class^="Repo_name"] a').filter({ hasText: 'playwright_tests_with_po' }).click();

    // Assertion
    await expect(page.locator('#repository-container-header [itemprop="name"]')).toHaveText('playwright_tests_with_po');
  });
});
