import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/loginPage';
import { logInfo, logError } from '../utils/logger';
import { BASE_URL, USERNAME, PASSWORD, VIEWPORT } from '../utils/constants';

// Cambia la resolución de la ventana
test.use({
    viewport: { 
        width: VIEWPORT.WIDTH, 
        height: VIEWPORT.HEIGHT 
    },
});

test('Successful Access', async ({ page }) => {
    try {
        // Go to the login page
        await page.goto(BASE_URL);
        logInfo(`Accessing ${BASE_URL}`);
        // Login
        const loginPage = new LoginPage(page);
        await loginPage.login(USERNAME, PASSWORD);
        logInfo(`Logging`);
        // Check if the page is loaded
        await expect(page.getByRole('heading', { name: 'TASK MONITOR' })).toBeVisible();
        logInfo('Successful Access');
    } catch (error) {
        logError(`Failed Test Successful Access ${error}`);
    }
});

test('Failed Access', async ({ page }) => {
    try {
        // Go to the login page
        await page.goto(BASE_URL);
        logInfo(`Accessing ${BASE_URL}`);
        // Login
        const loginPage = new LoginPage(page);
        await loginPage.login(USERNAME, 'wrongPassword');
        logInfo(`Logging`);
        // Check if the error message is displayed
        await expect(page.locator('span.text-red-500')).toBeVisible();
        logInfo('Failed Access');
    } catch (error) {
        logError(`Failed Test Failed Access ${error}`);
    }
});