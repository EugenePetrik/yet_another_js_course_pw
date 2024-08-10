// @ts-check
import { PageHolder } from './PageHolder';
import { GitHubPage } from './pages/GitHubPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchPage } from './pages/search/SearchPage';

export class Pages extends PageHolder {
  /**
   * @type {SearchPage}
   */
  searchPage = new SearchPage(this.page);

  /**
   * @type {ProfilePage}
   */
  profilePage = new ProfilePage(this.page);

  /**
   * @type {GitHubPage}
   */
  githubPage = new GitHubPage(this.page);
}
