import { test, expect, BrowserContext, Page} from '@playwright/test';
import { LoginPage} from '../pages/loginPage';
import { logInfo, logError, logWarning } from '../utils/logger';
import { BASE_URL, USERNAME, PASSWORD, VIEWPORT } from '../utils/constants';
import { RopaPage } from '../pages/ropaPage';

/*
    Se realizo la prueba de la eliminacion
    de un registro en el modulo de ROPA de
    dos formas diferentes
*/

// Change the window resolution
test.use({
    viewport: { 
        width: VIEWPORT.WIDTH, 
        height: VIEWPORT.HEIGHT 
    },
});

let context: BrowserContext;
let page: Page;
let ropaPage: RopaPage;

//Hacer login antes de TODAS las pruebas
test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    ropaPage = new RopaPage(page);
    // Login
    await page.goto(BASE_URL);
    logInfo(`Accessing ${BASE_URL}`);
    const loginPage = new LoginPage(page);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page.getByRole('heading', { name: 'TASK MONITOR' })).toBeVisible();
    logInfo('Successful login');
    // Go to Ropa
    await ropaPage.goToRopa();
    await expect(page).toHaveURL('https://pubivdjier-testing.priverion.dev/ropa');
    await expect(page.locator('span[data-cy="title-Record of Processing Activities"]')).toBeVisible();
    logInfo(`Accessing Ropa`);
});

test.afterAll(async () => {
    await context.close();
});

test ('Delete ROPA successfully Method #1', async () => {
    try {
        // Delete Ropa
        await ropaPage.deleteRopa(1);
        logInfo('Ropa deleted successfully');
    } catch (error) {
        //
        logError(`Failed Test Delete ROPA successfully Method #1 ${error}`);
    }
});

test ('Delete ROPA successfully Method #2', async () => {
    try {
        // Delete Ropa
        await ropaPage.deleteRopa(2);
        logInfo('Ropa deleted successfully');
    } catch (error) {
        // Log the error
        logError(`Failed Test Delete ROPA successfully Method #2 ${error}`);
    }
});
