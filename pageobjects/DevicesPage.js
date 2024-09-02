import { FiltersPage } from './FilterPage.js';

export class DevicesPage {
  constructor(page) {
    this.page = page;
    this.createDeviceButton = page.getByLabel('Create Device').getByRole('button');
    this.statusDropdown = page.getByLabel('Status *');
    this.serialNumberInput = page.getByLabel('Serial number');
    this.typeDropdown = page.getByLabel('Type *');
    this.conditionDropdown = page.getByLabel('', { exact: true });
    this.makeTextbox = page.getByRole('textbox', { name: 'Make' });
    this.modelTextbox = page.getByRole('textbox', { name: 'Model' });
    this.colorInput = page.getByLabel('Color');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.successMessage = page.getByText('New device created with asset');
  }

  async createDevice(device) {
    await this.createDeviceButton.click();
    await this.statusDropdown.click();
    await this.page.getByRole('option', { name: device.STATUS }).click();
    await this.serialNumberInput.fill(device.SERIAL_NUMBER);
    await this.typeDropdown.click();
    await this.page.getByRole('option', { name: device.TYPE }).click();
    await this.conditionDropdown.click();
    await this.page.getByRole('option', { name: device.CONDITION }).click();
    await this.makeTextbox.fill(device.MAKE);
    await this.modelTextbox.fill(device.MODEL);
    await this.colorInput.fill(device.COLOR);
    await this.saveButton.click();
  }

  async isDeviceCreated() {
    return await this.successMessage.isVisible();
  }

  async applyFilters(filters) {
    const filtersPage = new FiltersPage(this.page);
    await filtersPage.openFilters();
    await this.page.getByRole('button', { name: '​', exact: true }).nth(1).click();

    for (const filter of filters) {
      await filtersPage.selectFilter(filter);
      await filtersPage.deselectFilter(filter);
    }
  }
}

module.exports = { DevicesPage };
