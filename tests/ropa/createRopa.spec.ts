import { test, expect, BrowserContext, Page} from '@playwright/test';
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

let context: BrowserContext;
let page: Page;
let ropaPage: RopaPage;

// 🔹 Hacer login antes de TODAS las pruebas y compartir sesión
test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    ropaPage = new RopaPage(page);

    await page.goto(BASE_URL);
    const loginPage = new LoginPage(page);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page.getByRole('heading', { name: 'TASK MONITOR' })).toBeVisible();
    logInfo('Successful login');
});

test.afterAll(async () => {
    await context.close();
});

test('Create ROPA successfully', async () => {
    try {
        await ropaPage.goToRopa();
        await expect(page).toHaveURL('https://pubivdjier-testing.priverion.dev/ropa');
        await expect(page.locator('span[data-cy="title-Record of Processing Activities"]')).toBeVisible();
        logInfo(`Accessing Ropa`);
        await page.getByRole('button', { name: 'Create' }).click();
        await page.locator('a[data-cy="menu-ropa-create"]').click();
        await page.pause();
    } catch (error) {
        logError(`Failed Test Create Ropa ${error}`);
    }
});

test('Creation form validation', async () => {
    try {
        await ropaPage.goToRopa();
        await expect(page).toHaveURL('https://pubivdjier-testing.priverion.dev/ropa');
        await expect(page.locator('span[data-cy="title-Record of Processing Activities"]')).toBeVisible();
        logInfo(`Accessing Ropa`);
        await page.pause();
        
    } catch (error) {
        logError(`Failed Test Create Ropa ${error}`);
    }
});