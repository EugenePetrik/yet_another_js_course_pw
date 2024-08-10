import { baseFixture as test } from '../fixtures/base';

test.describe('Simon Smith app basic tests (without page objects)', { tag: '@ui @regression' }, () => {
  const username = 'ovartem';

  test.beforeEach(async ({ /** @type {{ app: import('../app/Pages').Pages }} */ app }) => {
    // Arrange
    await app.searchPage.navigate();
  });

  test('should perform search', async ({ /** @type {{ app: import('../app/Pages').Pages }} */ app }) => {
    // Act
    await app.searchPage.searchForUser(username);

    // Assertion
    await app.searchPage.searchResultsComponent.expectUserFound(username);
  });

  test('should open user profile', async ({ /** @type {{ app: import('../app/Pages').Pages }} */ app }) => {
    // Act
    await app.searchPage.searchForUser(username);
    await app.searchPage.searchResultsComponent.openUserProfile(username);

    // Assertion
    await app.profilePage.expectProfileTitleName('Artem Ovcharenko');
    await app.profilePage.expectProfileTitleUsername(`@${username}`);
    await app.profilePage.expectProfileRepos(['wdio_tests_with_po', 'playwright_tests_with_po']);
  });

  test('should open playwright_tests_with_po repository', async ({
    /** @type {{ app: import('../app/Pages').Pages }} */ app,
  }) => {
    // Act
    await app.searchPage.searchForUser(username);
    await app.searchPage.searchResultsComponent.openUserProfile(username);

    await app.profilePage.openRepository('playwright_tests_with_po');

    // Assertion
    await app.githubPage.expectRepositoryTitle('playwright_tests_with_po');
  });
});
