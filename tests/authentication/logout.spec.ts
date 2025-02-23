import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/loginPage';
import { BASE_URL, USERNAME, PASSWORD, VIEWPORT } from '../utils/constants';
import { logInfo, logError } from '../utils/logger';

/*
    Se realizo la prueba de logout exitoso
*/

// Change the window resolution
test.use({
    viewport: { 
        width: VIEWPORT.WIDTH, 
        height: VIEWPORT.HEIGHT 
    },
});

test('Logout', async ({ page }) => {
    try {
        // Go to the login page
        await page.goto(BASE_URL);
        logInfo(`Accessing ${BASE_URL}`);
        // Login
        const loginPage = new LoginPage(page);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page.getByRole('heading', { name: 'TASK MONITOR' })).toBeVisible();
        await page.locator('button#user_logged_menu_button_id').click();
        logInfo('Logging');
        // Logout
        await page.getByRole('button', { name: 'Logout' }).click();
        logInfo('Logout');
        // Check if the login page is loaded
        await expect(page.getByRole('textbox', { name: 'E-Mail Address' })).toBeVisible();
        await expect(page).toHaveURL(BASE_URL);
        logInfo('Successful Logout');
    } catch (error) {
        logError(`Failed Test Logout ${error}`);
    }
});