import { test, expect, BrowserContext, Page} from '@playwright/test';
import { LoginPage} from '../pages/loginPage';
import { logInfo, logError } from '../utils/logger';
import { BASE_URL, USERNAME, PASSWORD, VIEWPORT } from '../utils/constants';
import { RopaPage } from '../pages/ropaPage';
import { generateRandomString, generateRandomStatus, generateRandomResposiblePerson } from '../utils/helpers';

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
        // Generate random data
        const randomString = generateRandomString();
        const randomStatus = generateRandomStatus();
        const randomResponsiblePerson = generateRandomResposiblePerson();
        // Go to Ropa
        await ropaPage.goToRopa();
        await expect(page).toHaveURL('https://pubivdjier-testing.priverion.dev/ropa');
        await expect(page.locator('span[data-cy="title-Record of Processing Activities"]')).toBeVisible();
        logInfo(`Accessing Ropa`);
        // Create Ropa
        await page.getByRole('button', { name: 'Create' }).click();
        await page.locator('a[data-cy="menu-ropa-create"]').click();
        await page.locator('//div[@data-cy=\'select-type-responsible-person\']//input').fill(randomResponsiblePerson)
        await page.keyboard.press('Enter');
        await page.locator('//div[@data-cy=\'select-type-status\']//input').fill(randomStatus)
        await page.keyboard.press('Enter');
        await page.getByRole('textbox', { name: 'Name' }).fill(randomString);
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page).toHaveURL(/\/ropa\/detail\/.+/);
        await expect(page.locator('div#tree-menu')).toBeVisible();
        logInfo('Ropa created successfully');
    } catch (error) {
        logError(`Failed Test Create Ropa ${error}`);
    }
});

test('Creation form validation', async () => {
    try {
        const randomStatus = generateRandomStatus();
        const randomResponsiblePerson = generateRandomResposiblePerson();
        await ropaPage.goToRopa();
        await expect(page).toHaveURL('https://pubivdjier-testing.priverion.dev/ropa');
        await expect(page.locator('span[data-cy="title-Record of Processing Activities"]')).toBeVisible();
        logInfo(`Accessing Ropa`);
        //Validar mensaje de error al no ingresar nombre
        await page.getByRole('button', { name: 'Create' }).click();
        await page.locator('a[data-cy="menu-ropa-create"]').click();
        await page.locator('//div[@data-cy=\'select-type-responsible-person\']//input').fill(randomResponsiblePerson);
        await page.keyboard.press('Enter');
        await page.locator('//div[@data-cy=\'select-type-status\']//input').fill(randomStatus);
        await page.keyboard.press('Enter');
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.locator('span[data-cy="error-field_required"]')).toBeVisible();
    } catch (error) {
        logError(`Failed Test Create Ropa ${error}`);
    }
});