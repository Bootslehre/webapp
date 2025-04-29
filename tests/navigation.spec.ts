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

test('clicking the back button on /licenses/{questionareId} takes you back to the list overview', async ({ page }) => {
  await page.goto('/licenses/binnen-basis');
  await page.getByTestId('back-button').click();
  await page.waitForURL('/lists');
  await expect(page).toHaveURL('/lists');
});

test('clicking the back button on /licenses/{questionareId}/{questionId} takes you back to the questionare page', async ({ page }) => {
  await page.goto('/licenses/binnen-basis/practice');
  await page.getByTestId('back-button').click();
  await page.waitForURL('/licenses/binnen-basis');
  await expect(page).toHaveURL('/licenses/binnen-basis');
});
