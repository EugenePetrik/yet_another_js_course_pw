// @ts-check
import { PageHolder } from '../src/tests/PageHolder.js';
import { HomePage } from './HomePage.js';
import { LoginPage } from './LoginPage';
import { DevicesPage } from './DevicesPage';
import { FiltersPage } from './FilterPage.js';

export class Pages extends PageHolder {
  constructor(page) {
    super(page); // Call the parent constructor if needed
    this.page = page; // Ensure `page` is set
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.devicesPage = new DevicesPage(this.page);
    this.filtersPage = new FiltersPage(this.page);
  }
}

module.exports = { Pages };
