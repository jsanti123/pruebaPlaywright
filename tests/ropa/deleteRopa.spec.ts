import { test, expect, BrowserContext, Page} from '@playwright/test';
import { LoginPage} from '../pages/loginPage';
import { logInfo, logError, logWarning } from '../utils/logger';
import { BASE_URL, USERNAME, PASSWORD, VIEWPORT } from '../utils/constants';
import { RopaPage } from '../pages/ropaPage';
import { log } from 'console';

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
    /*
    elemento container: //div[@id="selectable-table"]//table
    .//tr -> filas
    .//td -> columnas
    */
    try {
        const table = await page.locator('//div[@id="selectable-table"]//table//tbody')
        const rows = await table.locator('xpath=.//tr').all();
        const firstRow = await rows.at(0)?.locator('xpath=.//td').all();
        if (firstRow?.length === 1) {
            logWarning('No data available in table');
        } else {
            
        }
    } catch (error) {
        logError(`Failed Test Delete ROPA successfully Method #1 ${error}`);
    }
});

test ('Delete ROPA successfully Method #2', async () => {
    try {

    } catch (error) {
        logError(`Failed Test Delete ROPA successfully Method #2 ${error}`);
    }
});
