import { Locator, Page } from '@playwright/test';

export class LoginPage {

    // Locators
    private readonly username: Locator;
    private readonly nextButttton: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;

    // Constructor
    constructor(page: Page) {
        this.username = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.nextButttton = page.getByRole('button', { name: 'Next' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    // Login method
    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.nextButttton.click();
        await this.password.fill(password);
        await this.loginButton.click();
    }
}