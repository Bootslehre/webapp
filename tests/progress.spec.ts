import { expect, test } from '@playwright/test';

test('answering questions updates progress and progress can be reset', async ({ page }) => {
  await page.goto('/lists/binnen-basis/38');
  await page.click('text=Beim Umweltbundesamt.');

  await page.goto('/lists/binnen-basis/1');
  await page.click('text=Der verantwortliche Schiffsführer muss bestimmt werden.');

  await page.getByTestId('back-button').click();
  await page.waitForURL('/lists/binnen-basis');

  let text = await page.getByTestId('progress').innerText();
  expect(text).toBe('1% Fortschritt');

  await page.getByTestId('open-progress-dialog').click();
  await page.click('text=Zurücksetzen');

  // second verification
  await page.click('text=Lernfortschritt zurücksetzen');
  await page.getByTestId('close-dialog').click();

  text = await page.getByTestId('progress').innerText();
  expect(text).toBe('0% Fortschritt');
});
