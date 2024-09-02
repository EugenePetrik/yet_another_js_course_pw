/* eslint-disable prettier/prettier */
// @ts-check
import { expect, test } from '@playwright/test';
import { profile } from 'console';
import { Pages } from './app/Pages';


test.describe('first test', {tag: '@ui' }, () => {



test.beforeEach(async ({page})  => {
    const username = 'anastasia-ext@allwhere.co';
    const password = '';
    const app = new Pages(page);  
    await app.loginPage.login(username, password);
})

    test('first real Test', async ({page}) => {
        const app = new Pages(page);        
        const org = 'ACME';
        const purchaser = 'Josh ACME';
        const statusFilterToCheck = 'Pending Retrieval';
        await app.homePage.closeAllWindowsAndClearThePage();
        await app.homePage.selectOrganization(org);
        await app.homePage.selectPurchaser(purchaser)
        await app.homePage.navigateToDevicesPageByUI();

        await app.assetsPage.openFilterDrawerSelectStatusFromFilter(statusFilterToCheck);
        await app.assetsPage.expectFilterByStatusResultsBeCorrectOnAllPages()
             
    });

    

});
