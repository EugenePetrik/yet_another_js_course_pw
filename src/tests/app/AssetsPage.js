// @ts-check
import { expect } from '@playwright/test';
import { BasePageNavigation } from '../BasePageNavigation';


export class AssetsPage extends BasePageNavigation{
pagePath = '';

acceptCookiesButton = this.page.getByText('Accept');
orgDropdown = this.page.getByLabel('Open').first()

filterDrawerButton = this.page.getByRole('button', { name: 'Filters' });
statusFilterDropDown = this.page.getByRole('button', { name: '​', exact: true }).nth(1);
nextPageButton = this.page.getByLabel('Go to next page');





async openFilterDrawerSelectStatusFromFilter(status){
    await this.filterDrawerButton.click();
    await this.statusFilterDropDown.click();
    await this.page.getByRole('option', { name: status }).click();
    
    //closing filters menu
    await this.page.locator('#menu- > .MuiBackdrop-root').click();
    await this.page.getByTestId('assets-filter-by-close-icon');
    //await this.page.locator('div:nth-child(15) > .MuiBackdrop-root').click();
}

async expectFilterByStatusResultsBeCorrectOnAllPages(status){
// Function to check the status cells on the current page
    const checkStatusCells = async () => {
         const statusCells = await this.page.locator('.MuiDataGrid-cell--withRenderer > .MuiChip-root');
        // const cellCount = await statusCells.count();

        // for (let i = 0; i < cellCount; i++) {
        //     const cellText = await statusCells.nth(i).textContent();
        //     expect(cellText).toBe('status');
            
        // }
        await expect(statusCells, 'Order Status in the Filtered page is incorrect').toContainText('[status]');
    };

    // Check the cells on the first page
    await checkStatusCells();

    // Loop through all pagination pages
    while (true) {
        // Check if there is a next page button and if it is enabled
        
        const isNextPageDisabled = await this.nextPageButton.isDisabled();

        if (isNextPageDisabled) {
            // If next page button is disabled, we are on the last page
            break;
        }

        // Click the next page button
        await this.nextPageButton.click();

        // Wait for the new page to load (you might need to adjust the selector or add more waiting logic)
        await this.page.waitForSelector('.MuiDataGrid-cell--withRenderer > .MuiChip-root');

        // Check the cells on the new page
        await checkStatusCells();
    }
    
}
}
