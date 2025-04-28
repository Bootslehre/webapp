import { expect, test } from '@playwright/test';

test('clicking the logo takes you back to home', async ({ page }) => {
  await page.goto('/lists');
  await page.getByTestId('header-logo').click();
  await page.waitForURL('/');
  await expect(page).toHaveURL('/');
});

test('clicking the back button on /lists takes you back to home', async ({ page }) => {
  await page.goto('/lists');
  await page.getByTestId('back-button').click();
  await page.waitForURL('/');
  await expect(page).toHaveURL('/');
});

test('clicking the back button on /lists/{questionareId} takes you back to the list overview', async ({ page }) => {
  await page.goto('/lists/binnen-basis');
  await page.getByTestId('back-button').click();
  await page.waitForURL('/lists');
  await expect(page).toHaveURL('/lists');
});

test('clicking the back button on /lists/{questionareId}/{questionId} takes you back to the questionare page', async ({ page }) => {
  await page.goto('/lists/binnen-basis/21');
  await page.getByTestId('back-button').click();
  await page.waitForURL('/lists/binnen-basis');
  await expect(page).toHaveURL('/lists/binnen-basis');
});
