/*
fill() clears the existing value before entering new text.
type() simulates real keyboard typing and appends to the current value.
Use fill() for regular form inputs and type() when testing typing behavior or keyboard events.
*/
import { test, expect } from '@playwright/test';

test('fill clears the field while type appends text', async ({ page }) => {
  await page.goto('/');

  const input = page.getByPlaceholder('Enter intern name');

  await input.fill('John');
  await expect(input).toHaveValue('John');

  await input.fill('Rahul');
  await expect(input).toHaveValue('Rahul');

  await input.type(' Kumar');
  await expect(input).toHaveValue('Rahul Kumar');
});



/*
page.keyboard.press() simulates pressing a keyboard key.
This test checks that pressing Tab moves the focus from the name input
to the score input, making sure keyboard navigation works correctly.
*/
test('Tab moves focus from name input to score input', async ({ page }) => {
  await page.goto('/');

  const nameInput = page.getByPlaceholder('Enter intern name');
  const scoreInput = page.getByPlaceholder('Enter score');

  await nameInput.fill('Rahul');

  await page.keyboard.press('Tab');

  await expect(scoreInput).toBeFocused();
});




/*
page.screenshot() captures the current state of the page.
Saving it to a file helps inspect the UI or debug test failures later.
*/

test('take a screenshot during the test', async ({ page }) => {
  await page.goto('/');

  await page.screenshot({
    path: 'screenshots/home-page.png',
  });

  await expect(page.getByRole('heading', { name: 'Intern Dashboard' })).toBeVisible();
});



/*
test.only() runs only the marked test and skips all other tests in the suite.
test.skip() skips a specific test without running it.
These are useful while debugging or working on a single test.
Always remove test.only() before committing, as it prevents the rest of the tests from running.
*/
test.only('runs only this test', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Intern Dashboard' })).toBeVisible();
});

test.skip('this test is skipped', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Rahul')).toBeVisible();
});

test('this test will not run because of test.only()', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Add Intern' })).toBeVisible();
});