import { expect, test } from '@playwright/test';

test('answering questions updates progress and progress can be reset', async ({ page }) => {
  await page.goto('/lists/SBF_BINNEN_BASIS/38');
  await page.click('text=Beim Umweltbundesamt.');

  await page.goto('/lists/SBF_BINNEN_BASIS/1');
  await page.click('text=Der verantwortliche Schiffsführer muss bestimmt werden.');

  await page.getByTestId('back-button').click();
  await page.waitForURL('/lists/SBF_BINNEN_BASIS');

  let text = await page.getByTestId('progress').innerText();
  expect(text).toBe('1% Fortschritt');

  await page.click('text=Lernstand zurücksetzen');
  text = await page.getByTestId('progress').innerText();
  expect(text).toBe('0% Fortschritt');
});
