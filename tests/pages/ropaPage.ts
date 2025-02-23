import { expect, Locator, Page } from '@playwright/test';
import { generateRandomString, generateRandomStatus, generateRandomResposiblePerson, generateRandomNumber } from '../utils/helpers';

export class RopaPage {

    // Locators Login
    private readonly documentButton: Locator;
    private readonly ropaButton: Locator;
    // Locators Create Ropa
    private readonly createButton: Locator;
    private readonly buttonCreateRopa: Locator;
    private readonly selectResponsiblePerson: Locator;
    private readonly selectStatus: Locator;
    private readonly nameTextBox: Locator;
    private readonly saveButton: Locator;
    // Locators Delete Ropa
    private readonly table: Locator;
    private readonly deleteButton: Locator;
    private readonly confirmButton: Locator;
    private readonly messageSuccess: Locator;

    // Constructor
    constructor(page: Page) {
        // Locators Login
        this.documentButton = page.getByRole('button', { name: 'Document' });
        this.ropaButton = page.getByRole('link', { name: 'Record of Processing Activities' });
        // Locators Create Ropa
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.buttonCreateRopa = page.locator('a[data-cy="menu-ropa-create"]');
        this.selectResponsiblePerson = page.locator('//div[@data-cy=\'select-type-responsible-person\']//input');
        this.selectStatus = page.locator('//div[@data-cy=\'select-type-status\']//input');
        this.nameTextBox = page.getByRole('textbox', { name: 'Name' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        // Locators Delete Ropa
        this.table = page.locator('//div[@id="selectable-table"]//table//tbody');
        this.deleteButton = page.locator('svg[data-icon="trash"]');
        this.confirmButton = page.locator('svg[data-icon="circle-check"]');
        this.messageSuccess = page.locator('//div[@class="Toastify"]//button[@type="button"]');
    }

    // Method to go to Ropa
    async goToRopa() {
        await this.documentButton.click();
        await this.ropaButton.click();
    }

    // Method to create Ropa
    async createRopa(page: Page, context: boolean) {
        // Generate random data
        const randomString = generateRandomString();
        const randomStatus = generateRandomStatus();
        const randomResponsiblePerson = generateRandomResposiblePerson();
        // Create Ropa
        await this.createButton.click();
        await this.buttonCreateRopa.click();
        await this.selectResponsiblePerson.fill(randomResponsiblePerson);
        await page.keyboard.press('Enter');
        await this.selectStatus.fill(randomStatus);
        await page.keyboard.press('Enter');
        if (context) {
            await this.nameTextBox.fill(randomString);
        }
        await this.saveButton.click();

        return [randomStatus, randomResponsiblePerson];
    }

    // Method to delete Ropa
    async deleteRopa(method: number) {
        // Get the table
        const rows = await this.table.locator('xpath=.//tr').all();
        const firstRow = await rows.at(0)?.locator('xpath=.//td').all();
        if (firstRow?.length === 1) {
            return false;
        } else {
            if (method === 1) {
                // Delete Ropa Method #1
                const randomNumber = generateRandomNumber(rows.length);
                const column1 = await rows.at(randomNumber)?.locator('xpath=.//td[1]//input').click();
                await this.deleteButton.click();
                await this.confirmButton.click();
            } else if (method === 2) {
                const randomNumber = generateRandomNumber(rows.length);
                const column1 = await rows.at(randomNumber)?.locator('xpath=.//td[8]//button').click();
                await this.deleteButton.click();
                await this.confirmButton.click();
            }
            await expect(this.messageSuccess).toBeVisible();
        }
    }
}