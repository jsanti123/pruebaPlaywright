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

test('Create ROPA successfully', async () => {
    try {
        // Create Ropa
        const result = await ropaPage.createRopa(page, true);
        // Check if the page is loaded
        await expect(page).toHaveURL(/\/ropa\/detail\/.+/);
        await expect(page.locator('div#tree-menu')).toBeVisible();
        const responsiblePerson = await page.locator('//div[@data-cy="select-type-responsible-person"]//div[@class="css-18ogjxe-singleValue"]').innerText();
        const status = await page.locator('//div[@data-cy="select-type-status"]//div[@class="css-18ogjxe-singleValue"]').innerText();
        await expect(responsiblePerson).toContain(result[1]);
        await expect(status).toContain(result[0]);
        logInfo('Ropa created successfully');
    } catch (error) {
        logError(`Failed Test Create Ropa ${error}`);
    }
});

test('Creation Form validation', async () => {
    try {
        // Generate random data
        const randomStatus = generateRandomStatus();
        const randomResponsiblePerson = generateRandomResposiblePerson();
        //Validar mensaje de error al no ingresar nombre
        const result = await ropaPage.createRopa(page, false);
        // Check if the error message is displayed
        await expect(page.locator('span[data-cy="error-field_required"]')).toBeVisible();
        logInfo('Creation form validated successfully');
    } catch (error) {
        logError(`Failed Test Create Ropa ${error}`);
    }
});