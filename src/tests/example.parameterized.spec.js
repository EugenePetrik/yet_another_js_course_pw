import { baseFixture as test } from '../fixtures/base';

const testData = [
  {
    username: 'ovartem',
    name: 'Artem Ovcharenko',
    repositories: ['wdio_tests_with_po', 'playwright_tests_with_po'],
    repositoryToOpen: 'playwright_tests_with_po',
  },
  {
    username: 'EugenePetrik',
    name: 'Eugene Petrik',
    repositories: ['sdet-technical-task', 'bookcart-playwright-web-tests'],
    repositoryToOpen: 'sdet-technical-task',
  },
];

testData.forEach(({ username, name, repositories, repositoryToOpen }) => {
  test.describe('Simon Smith app basic tests (without page objects)', { tag: '@ui' }, () => {
    test.beforeEach(async ({ /** @type {{ app: import('../app/Pages').Pages }} */ app }) => {
      // Arrange
      await app.searchPage.navigate();
    });

    test(`should perform search for ${username}`, async ({
      /** @type {{ app: import('../app/Pages').Pages }} */ app,
    }) => {
      // Act
      await app.searchPage.searchForUser(username);

      // Assertion
      await app.searchPage.searchResultsComponent.expectUserFound(username);
    });

    test(`should open user profile for ${name}`, async ({
      /** @type {{ app: import('../app/Pages').Pages }} */ app,
    }) => {
      // Act
      await app.searchPage.searchForUser(username);
      await app.searchPage.searchResultsComponent.openUserProfile(username);

      // Assertion
      await app.profilePage.expectProfileTitleName(name);
      await app.profilePage.expectProfileTitleUsername(`@${username}`);
      await app.profilePage.expectProfileRepos(repositories);
    });

    test(`should open ${repositoryToOpen} repository`, async ({
      /** @type {{ app: import('../app/Pages').Pages }} */ app,
    }) => {
      // Act
      await app.searchPage.searchForUser(username);
      await app.searchPage.searchResultsComponent.openUserProfile(username);

      await app.profilePage.openRepository(repositoryToOpen);

      // Assertion
      await app.githubPage.expectRepositoryTitle(repositoryToOpen);
    });
  });
});

// const testDataNew = [
//   {
//     sortBy: 'Name (A to Z)',
//   },
//   {
//     sortBy: 'Name (Z to A)',
//   },
//   {
//     sortBy: 'Price (low to high)',
//   },
//   {
//     sortBy: 'Price (high to low)',
//   },
// ];

// testDataNew.forEach(data => {
//   test(`Sort by - ${data.sortBy}}`, async ({ page }) => {
//     await page.locator('[data-test="product-sort-container"]').selectOption(sortBy);

//     const names = (await page.locator('[data-test="inventory-item-name"]').allInnerTexts()).map(el => el.trim());

//     if (sortBy === 'Name (A to Z)') {
//       const namesSortedFromAToZ = names.sort().reverse();
//       await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(namesSortedFromAToZ);
//     }
//   });
// });

// async sortBy() {
//   await page.locator('[data-test="product-sort-container"]').selectOption(sortBy);
// }
