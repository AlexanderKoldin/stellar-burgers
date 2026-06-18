import { expect, test } from '@playwright/test';

test.describe('Конструктор бургеров', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/app.har', {
      url: '**/api/ingredients',
      notFound: 'fallback'
    });

    await page.goto('/');
  });

  test('добавление булки в конструктор', async ({ page }) => {
    const firstIngredient = page.locator('li').first();
    const ingredientName = await firstIngredient
      .locator('p')
      .last()
      .textContent();

    await page.getByRole('button', { name: 'Добавить' }).first().click();

    await expect(page.getByText(`${ingredientName} (верх)`)).toBeVisible();
    await expect(page.getByText(`${ingredientName} (низ)`)).toBeVisible();
  });

  test('добавление начинки в конструктор', async ({ page }) => {
    const mainIngredient = page.locator('li').nth(1);
    const ingredientName = await mainIngredient
      .locator('p')
      .last()
      .textContent();

    await page.getByRole('button', { name: 'Добавить' }).nth(1).click();

    await expect(
      page
        .locator('.constructor-element__text', { hasText: ingredientName! })
        .first()
    ).toBeVisible();
  });
});
