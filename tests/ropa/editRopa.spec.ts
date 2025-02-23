import { test, expect, BrowserContext, Page} from '@playwright/test';
import { LoginPage} from '../pages/loginPage';
import { logInfo, logError, logWarning } from '../utils/logger';
import { BASE_URL, USERNAME, PASSWORD, VIEWPORT } from '../utils/constants';
import { RopaPage } from '../pages/ropaPage';
import { generateRandomNumber } from '../utils/helpers';
import { after } from 'node:test';

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

test ('Edit ROPA successfully', async () => {
    // Edit Ropa
    const result = await ropaPage.editRopa(page);
    // Check if the page is loaded
    await expect(page).toHaveURL(/\/ropa\/detail\/.+/);
    await expect(page.locator('div#tree-menu')).toBeVisible();
    await page.reload({ waitUntil: 'networkidle' });
    // Check if the data is correct
    const responsiblePerson = await page.locator('//div[@data-cy="select-type-responsible-person"]//div[@class="css-18ogjxe-singleValue"]').textContent();
    const status = await page.locator('//div[@data-cy="select-type-status"]//div[@class="css-18ogjxe-singleValue"]').textContent();
    const name = await page.locator('//span[@data-cy="Name-value"]').textContent();
    const department = await page.locator('//span[@data-cy="Department-value"]').textContent();
    const description = await page.locator('//span[@data-cy="Brief description of processing-value"]//textarea').textContent();
    await expect(status).toContain(result[0]);
    await expect(responsiblePerson).toContain(result[1]);
    await expect(name).toContain(result[2]);
    await expect(department).toContain('prueba');
    await expect(description).toContain(result[2]);

    logInfo('Ropa edited successfully');
});