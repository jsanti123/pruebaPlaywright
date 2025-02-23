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
    // Locators Edit Ropa
    private readonly editButton: Locator;
    private readonly descriptionTextBox: Locator;
    private readonly selectOrganizacionalUnit: Locator;
    // Locators Purpose Ropa
    private readonly purposeButton: Locator;
    private readonly addPurposeButton: Locator;
    private readonly createPurposeButton: Locator;
    private readonly selectPurpose: Locator;
    private readonly purposeTextBox: Locator;
    private readonly savePurposeButton: Locator;
    private readonly addPurpose: Locator;

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
        // Locators Edit Ropa
        this.editButton = page.getByRole('button', { name: 'Edit' });
        this.descriptionTextBox = page.getByRole('textbox', { name: 'Brief description of processing' });
        this.selectOrganizacionalUnit = page.locator('//div[@data-cy="select-organization-unit"]//input[@type="text"]');
        // Locators Purpose Ropa
        this.purposeButton = page.locator('//span[@data-cy="menu-item-purpose-of-processings"]');
        this.addPurposeButton = page.getByRole('link', { name: 'Add' });
        this.createPurposeButton = page.getByRole('button', { name: 'Create' });
        this.selectPurpose = page.locator('//div//a[@data-cy="menu-"]');
        this.purposeTextBox = page.getByRole('textbox', { name: 'Description' });
        this.savePurposeButton = page.getByRole('button', { name: 'Save' });
        this.addPurpose = page.getByRole('button', { name: 'Add to list' });
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
            return true;
        }
    }

    async editGeneralRopa(page: Page) {
        // Generate random data
        const randomString = generateRandomString();
        const randomStatus = generateRandomStatus();
        const randomResponsiblePerson = generateRandomResposiblePerson();
        const rows = await this.table.locator('xpath=.//tr').all();
        const randomNumber = generateRandomNumber(rows.length);
        // Edit Ropa
        await rows.at(randomNumber)?.click();
        await this.editButton.click();
        await expect(page).toHaveURL(/\/ropa\/edit\/.+/);
        await this.selectResponsiblePerson.fill(randomResponsiblePerson);
        await page.keyboard.press('Enter');
        await this.selectStatus.fill(randomStatus);
        await page.keyboard.press('Enter');
        await this.nameTextBox.fill(randomString);
        await this.descriptionTextBox.fill(randomString);
        await page.keyboard.press('Enter');
        await this.selectOrganizacionalUnit.fill('prueba');
        await page.keyboard.press('Enter');
        await this.saveButton.click();       

        return [randomStatus, randomResponsiblePerson, randomString];
    }

    async editPurposeRopa(page: Page) {
        // Generate random data
        const rows = await this.table.locator('xpath=.//tr').all();
        const randomNumber = generateRandomNumber(rows.length);
        const randomString = generateRandomString();
        // Edit Ropa
        await rows.at(randomNumber)?.click();
        await this.purposeButton.click();
        await this.addPurposeButton.click();
        await this.createPurposeButton.click();
        await this.selectPurpose.click();
        await this.purposeTextBox.fill(randomString);
        await this.savePurposeButton.click();
        await this.addPurpose.click();

        return randomString;
    }
}