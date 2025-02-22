import { Locator, Page } from '@playwright/test';

export class RopaPage {

    // Locators
    private readonly documentButton: Locator;
    private readonly ropaButton: Locator;

    constructor(page: Page) {
        this.documentButton = page.getByRole('button', { name: 'Document' });
        this.ropaButton = page.getByRole('link', { name: 'Record of Processing Activities' });
    }

    async goToRopa() {
        await this.documentButton.click();
        await this.ropaButton.click();
    }
}