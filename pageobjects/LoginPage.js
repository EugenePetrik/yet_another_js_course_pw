import { BasePageNavigation } from './BasePageNavigation';

export class LoginPage extends BasePageNavigation {
  constructor(page) {
    super(page);
    this.pagePath =
      'https://dev-suoszvzj.us.auth0.com/u/login?state=hKFo2SBSN1d6Vl9kQng0cmdjeHFwTXIxTVNFWDhvNnBaaGNsU6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIEV6NXA2ZHpqYkpjcV9GeVppc0xQTWRGY21fc3JFcW00o2NpZNkgU3RHUENBa0xBSFJ4Sks5alhjU3VnSndpeWt6S2xPQm4';
    this.username_field = this.page.locator('#username');
    this.password_field = this.page.locator('#password');
    this.continue_button = this.page.getByRole('button', { name: 'Continue', exact: true });
  }

  async login(username, password) {
    await this.navigateToThisPage(); // Use the method from BasePageNavigation
    await this.username_field.fill(username);
    await this.password_field.fill(password);
    await this.continue_button.click();
  }
}

module.exports = { LoginPage };
