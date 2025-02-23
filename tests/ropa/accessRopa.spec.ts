import { test, expect} from '@playwright/test';
import { LoginPage} from '../pages/loginPage';
import { logInfo, logError } from '../utils/logger';
import { BASE_URL, USERNAME, PASSWORD, VIEWPORT } from '../utils/constants';
import { RopaPage } from '../pages/ropaPage';

// Cambia la resolución de la ventana
test.use({
    viewport: { 
        width: VIEWPORT.WIDTH, 
        height: VIEWPORT.HEIGHT 
    },
});

test('Access to Ropa', async ({page}) => {
    try {
        // Go to the login page
        await page.goto(BASE_URL);
        logInfo(`Accessing ${BASE_URL}`);
        // Login
        const loginPage = new LoginPage(page);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page.getByRole('heading', { name: 'TASK MONITOR' })).toBeVisible();
        logInfo('Successful Access');
        // Go to Ropa
        const ropaPage = new RopaPage(page);
        await ropaPage.goToRopa();
        await expect(page).toHaveURL('https://pubivdjier-testing.priverion.dev/ropa');
        await expect(page.locator('span[data-cy="title-Record of Processing Activities"]')).toBeVisible();
        logInfo(`Accessing Ropa`);

    } catch (error) {
        logError(`Failed Test Access to Ropa ${error}`);
    }
});