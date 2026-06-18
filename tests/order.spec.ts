import { expect, test } from '@playwright/test';

test.describe('Создание заказа в конструкторе бургера', () => {
  test.slow();

  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/app.har', {
      url: '**/api/ingredients',
      notFound: 'fallback'
    });

    await page.route('**/api/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: { email: 'test@test.ru', name: 'Test User' }
        })
      });
    });

    await page.route('**/api/orders', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          order: { number: 77777 }
        })
      });
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    await page.evaluate(() => {
      localStorage.setItem('refreshToken', 'test_refresh_token');
    });

    await page.context().addCookies([
      {
        name: 'accessToken',
        value: 'Bearer test_token',
        domain: 'localhost',
        path: '/'
      }
    ]);
  });

  test.afterEach(async ({ page, context }) => {
    await page.evaluate(() => localStorage.clear());
    await context.clearCookies();
  });

  test('полный цикл создания заказа', async ({ page }) => {
    await page.reload();

    await expect(page.getByText('Соберите бургер')).toBeVisible();

    await page.getByRole('button', { name: 'Добавить' }).first().click();

    const orderButton = page.getByRole('button', { name: 'Оформить заказ' });

    const responsePromise = page.waitForResponse('**/api/orders');
    await orderButton.click();
    await responsePromise;

    const modal = page.locator('#modals');

    await expect(modal.getByText('77777')).toBeVisible({ timeout: 10000 });
    await expect(modal.getByText(/идентификатор заказа/i)).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modal.getByText('77777')).toBeHidden();

    await expect(page.getByText('Выберите булки').first()).toBeVisible();
    await expect(page.getByText('Выберите начинку').first()).toBeVisible();
  });
});
