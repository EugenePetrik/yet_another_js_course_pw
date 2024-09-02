export class FiltersPage {
  constructor(page) {
    this.page = page;
  }

  async openFilters() {
    await this.page.getByRole('button', { name: 'Filters' }).click();
  }

  async selectFilter(filterName) {
    await this.page.getByRole('option', { name: filterName }).getByRole('checkbox').check();
  }

  async deselectFilter(filterName) {
    await this.page.getByRole('option', { name: filterName }).getByRole('checkbox').uncheck();
  }
}

module.exports = { FiltersPage };
