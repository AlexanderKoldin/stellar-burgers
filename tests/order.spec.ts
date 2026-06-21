import { expect, test } from '@playwright/test';

const ORDER_NUMBER = '106820';

test.describe('Создание заказа в конструкторе бургера', () => {
  test.slow();

  test.beforeEach(async ({ page, request }) => {
    const loginResponse = await request.post(
      'https://norma.education-services.ru/api/auth/login',
      {
        data: {
          email: 'me@mail.com',
          password: '123'
        }
      }
    );

    const { accessToken, refreshToken } = await loginResponse.json();

    await page.routeFromHAR('./tests/hars/app.har', {
      url: '**/api/**',
      notFound: 'fallback'
    });

    await page.context().addCookies([
      {
        name: 'accessToken',
        value: accessToken,
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.addInitScript((token) => {
      localStorage.setItem('refreshToken', token);
    }, refreshToken);

    await page.goto('/');
    await page.waitForSelector('li', { timeout: 15000 });
  });

  test.afterEach(async ({ page, context }) => {
    await page.evaluate(() => localStorage.clear());
    await context.clearCookies();
  });

  test('полный цикл создания заказа', async ({ page }) => {
    await expect(page.getByText('Соберите бургер')).toBeVisible();

    await page.getByRole('button', { name: 'Добавить' }).first().click();
    await page.getByRole('button', { name: 'Добавить' }).nth(1).click();

    const orderButton = page.getByRole('button', { name: 'Оформить заказ' });

    const responsePromise = page.waitForResponse('**/api/orders');
    await orderButton.click();
    await responsePromise;

    const modal = page.locator('#modals');

    await expect(modal.getByText(ORDER_NUMBER)).toBeVisible({ timeout: 10000 });
    await expect(modal.getByText(/идентификатор заказа/i)).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modal.getByText(ORDER_NUMBER)).toBeHidden();

    await expect(page.getByText('Выберите булки').first()).toBeVisible();
    await expect(page.getByText('Выберите начинку').first()).toBeVisible();
  });
});
