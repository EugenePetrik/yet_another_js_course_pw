// @ts-check
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GitHubPage extends BasePage {
  repoTitle = this.page.locator('#repository-container-header [itemprop="name"]');

  /**
   * @param {string | RegExp | readonly (string | RegExp)[]} name
   */
  async expectRepositoryTitle(name) {
    await expect(this.repoTitle, 'Repository title is not correct').toHaveText(name);
  }
}
