import { expect, test } from '@playwright/test';

test.describe('Конструктор бургеров', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/ingredients', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: [
            {
              _id: '60666c42cc7b9100273a666b',
              name: 'Флюоресцентная булка',
              type: 'bun',
              image: 'test.png',
              price: 988
            },
            {
              _id: '60666c42cc7b9100273a666d',
              name: 'Биокотлета из марсианской Магнолии',
              type: 'main',
              image: 'test.png',
              price: 424
            }
          ]
        })
      });
    });

    await page.goto('/');
  });

  test('Добавление булки в конструктор', async ({ page }) => {
    await page.getByRole('button', { name: 'Добавить' }).first().click();

    await expect(page.getByText('Флюоресцентная булка (верх)')).toBeVisible();

    await expect(page.getByText('Флюоресцентная булка (низ)')).toBeVisible();
  });
});
