import { expect, test } from '@playwright/test';

test.describe('Модальное окно ингредиента', () => {
  test.slow();

  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/app.har', {
      url: '**/api/ingredients',
      notFound: 'fallback'
    });

    await page.goto('/');
    await page.waitForSelector('li', { timeout: 15000 });
  });

  test('открытие модального окна по клику на ингредиент', async ({ page }) => {
    const firstIngredient = page.locator('li').first();

    const ingredientName = await firstIngredient
      .locator('p')
      .last()
      .textContent();

    const modal = page.locator('#modals');

    await expect(
      modal.getByRole('heading', { name: /детали ингредиента/i })
    ).not.toBeVisible();

    await firstIngredient.click();

    await expect(
      modal.getByRole('heading', { name: /детали ингредиента/i })
    ).toBeVisible();

    await expect(modal.getByText(ingredientName!)).toBeVisible();
  });

  test('закрытие модального окна', async ({ page }) => {
    const modal = page.locator('#modals');

    await expect(
      modal.getByRole('heading', { name: /детали ингредиента/i })
    ).not.toBeVisible();

    await page.locator('li').first().click();

    await expect(
      modal.getByRole('heading', { name: /детали ингредиента/i })
    ).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(
      modal.getByRole('heading', { name: /детали ингредиента/i })
    ).not.toBeVisible();
  });
});
