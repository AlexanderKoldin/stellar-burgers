import { expect, test } from '@playwright/test';

test.describe('Конструктор бургеров', () => {
  test.slow();

  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/app.har', {
      url: '**/api/ingredients',
      notFound: 'fallback'
    });

    await page.goto('/');
    await page.waitForSelector('li', { timeout: 15000 });
  });

  test('добавление булки в конструктор', async ({ page }) => {
    const firstIngredient = page.locator('li').first();
    const ingredientName = await firstIngredient
      .locator('p')
      .last()
      .textContent();

    const constructor = page.locator('section').filter({
      has: page.getByRole('button', { name: 'Оформить заказ' })
    });

    await expect(constructor.getByText('Выберите булки').first()).toBeVisible();

    await page.getByRole('button', { name: 'Добавить' }).first().click();

    await expect(
      constructor.getByText(`${ingredientName} (верх)`)
    ).toBeVisible();
    await expect(
      constructor.getByText(`${ingredientName} (низ)`)
    ).toBeVisible();
  });

  test('добавление начинки в конструктор', async ({ page }) => {
    const mainIngredient = page.locator('li').nth(1);
    const ingredientName = await mainIngredient
      .locator('p')
      .last()
      .textContent();

    const constructor = page.locator('section').filter({
      has: page.getByRole('button', { name: 'Оформить заказ' })
    });

    await expect(constructor.getByText('Выберите начинку')).toBeVisible();

    await page.getByRole('button', { name: 'Добавить' }).nth(1).click();

    await expect(
      constructor
        .locator('.constructor-element__text', { hasText: ingredientName! })
        .first()
    ).toBeVisible();
  });
});
