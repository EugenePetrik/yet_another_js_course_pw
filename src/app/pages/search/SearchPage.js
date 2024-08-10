// @ts-check
import { BasePage } from '../BasePage';
import { SearchResultsComponent } from './components/SearchResultsComponent';

export class SearchPage extends BasePage {
  pagePath = '/github-user-search/#/search';

  searchInput = this.page.locator('#searchInput');

  searchResultsComponent = new SearchResultsComponent(this.page);

  /**
   * @param {string} username
   */
  async searchForUser(username) {
    await this.page.locator('#searchInput').fill(username);
    await this.page.locator('#searchInput').press('Enter');
  }
}
