import { expect, test } from '@playwright/test';

test('открытие и закрытие модального окна', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Флюоресцентная булка').click();

  const modalHeader = page.getByRole('heading', {
    name: /Детали ингредиента/i
  });

  await expect(modalHeader).toBeVisible();

  const modal = page.locator('#modals');

  await modal.locator('button').click();

  await expect(modalHeader).toBeHidden();
});
