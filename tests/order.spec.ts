import { expect, test } from '@playwright/test';

test('полный цикл создания заказа', async ({ page }) => {
  await page.route('**/api/auth/user', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        user: {
          email: 'test@test.ru',
          name: 'Test User'
        }
      })
    });
  });

  await page.route('**/api/ingredients', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: [
          {
            _id: 'bun1',
            name: 'Булка тестовая',
            type: 'bun',
            proteins: 10,
            fat: 20,
            carbohydrates: 30,
            calories: 200,
            price: 100,
            image: 'bun.png'
          },
          {
            _id: 'main1',
            name: 'Мясо тестовое',
            type: 'main',
            proteins: 25,
            fat: 15,
            carbohydrates: 5,
            calories: 300,
            price: 200,
            image: 'meat.png'
          }
        ]
      })
    });
  });

  await page.route('**/api/orders', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        name: 'order test',
        order: {
          number: 77777
        }
      })
    });
  });

  await page.goto('/');

  await expect(page.getByText('Соберите бургер')).toBeVisible();

  await page.getByRole('button', { name: 'Добавить' }).first().click();

  const orderButton = page.getByRole('button', { name: 'Оформить заказ' });

  await Promise.all([
    page.waitForResponse('**/api/orders'),
    orderButton.click()
  ]);

  const modal = page.getByText(/идентификатор заказа/i);
  await expect(modal).toBeVisible();

  await expect(page.getByText('77777')).toBeVisible();

  const closeBtn = page.getByRole('button', { name: 'Закрыть' });
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  }
});
