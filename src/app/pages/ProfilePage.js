// @ts-check
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  profileName = this.page.locator('[class^="ProfileTitle_name"]');

  profileUsername = this.page.locator('[class^="ProfileTitle_username"]');

  reposLinks = this.page.locator('[class^="Repo_name"] a');

  /**
   * @param {string | RegExp | readonly (string | RegExp)[]} name
   */
  async expectProfileTitleName(name) {
    await expect(this.profileName, 'Profile name is not correct').toHaveText(name);
  }

  /**
   * @param {string | RegExp | readonly (string | RegExp)[]} username
   */
  async expectProfileTitleUsername(username) {
    await expect(this.profileUsername, 'Profile username is not correct').toHaveText(username);
  }

  /**
   * @param {string[]} names
   */
  async expectProfileRepos(names) {
    await expect(this.reposLinks, 'Repos links are empty').not.toHaveCount(0);
    await expect(this.reposLinks, 'Repository names are not correct').toContainText(names);
  }

  /**
   * @param {string} name
   */
  async openRepository(name) {
    await expect(this.reposLinks, 'Repos links are empty').not.toHaveCount(0);
    await this.reposLinks.filter({ hasText: new RegExp(`^${name}$`) }).click();
  }
}
