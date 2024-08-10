// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../PageHolder';

export class SearchResultsComponent extends PageHolder {
  searchResults = this.page.locator('[class^="SearchResults_item"]');

  /**
   * @param {string} username
   */
  async openUserProfile(username) {
    await this.searchResults.filter({ hasText: new RegExp(`^${username}$`) }).click();
  }

  /**
   * @param {string} username
   */
  async expectUserFound(username) {
    await expect(this.searchResults, 'Search Results is empty').not.toHaveCount(0);
    await expect(this.searchResults, 'Username is not correct').toContainText([username]);
  }
}
