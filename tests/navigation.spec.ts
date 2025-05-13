import { expect, test } from '@playwright/test';

test('clicking the logo takes you back to home', async ({ page }) => {
  await page.goto('/lists');
  await page.getByTestId('header-logo').click();
  await page.waitForURL('/');
  await expect(page).toHaveURL('/');
});

test('clicking the back button on /licenses takes you back to home', async ({ page }) => {
  await page.goto('/licenses');
  await page.getByTestId('back-button').click();
  await page.waitForURL('/');
  await expect(page).toHaveURL('/');
});

test('clicking the back button on /licenses/{questionareId} takes you back to the licenses overview', async ({ page }) => {
  await page.goto('/licenses/sbfSee');
  await page.getByTestId('back-button').click();
  await page.waitForURL('/licenses');
  await expect(page).toHaveURL('/licenses');
});
