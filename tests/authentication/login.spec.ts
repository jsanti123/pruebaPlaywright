import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/loginPage';

// Cambia la resolución de la ventana
test.use({
    viewport: { width: 1024, height: 768 },
  });

test('Successful Access', async ({ page }) => {
    await page.goto('https://pubivdjier-testing.priverion.dev/login');

    const loginPage = new LoginPage(page);
    await loginPage.login('santgt123@gmail.com', 'Tommy_1193102894')
    await expect(page.getByRole('heading', { name: 'TASK MONITOR' })).toBeVisible();
    await page.pause();
});