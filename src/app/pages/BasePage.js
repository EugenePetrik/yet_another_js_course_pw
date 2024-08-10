// @ts-check
import { Footer } from '../components/FooterComponent';
import { PageHolder } from '../PageHolder';

export class BasePage extends PageHolder {
  footer = new Footer(this.page);

  /**
   * @type {string}
   */
  pagePath;

  /**
   * @param {string} path
   */
  async navigate(path) {
    await this.page.goto(path ?? this.pagePath);
  }
}
