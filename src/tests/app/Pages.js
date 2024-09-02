// @ts-check
import { PageHolder } from '../PageHolder';
import { AssetsPage } from './AssetsPage';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';

export class Pages extends PageHolder {
  /**
   * @type {LoginPage}
   */
  loginPage = new LoginPage(this.page);

  /**
   * @type {HomePage}
   */
  homePage = new HomePage(this.page);

  /**
   * @type {AssetsPage}
   */
  assetsPage = new AssetsPage(this.page);
}
