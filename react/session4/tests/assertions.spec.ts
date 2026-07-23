import { test, expect } from '@playwright/test';

test.describe('Assertions — State', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Add Intern button is enabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Add Intern' })).toBeEnabled();
  });

  test('name input is editable', async ({ page }) => {
    await expect(page.getByPlaceholder('Name')).toBeEditable();
  });

  test('Present checkbox is checked by default', async ({ page }) => {
    await expect(page.getByRole('checkbox', { name: 'Present' })).toBeChecked();
  });

  test('name input receives focus when clicked', async ({ page }) => {
    await page.getByPlaceholder('Name').click();
    await expect(page.getByPlaceholder('Name')).toBeFocused();
  });
/*
toBeEnabled() verifies that a button can actually be interacted with, not just seen.
A button may be visible on the page but still be disabled until required fields are
filled or a condition is met. In that case, toBeVisible() would pass, while
toBeEnabled() correctly detects that the button is not yet usable.
*/
});

test.describe('Assertions — Attributes and Classes', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Present checkbox has type attribute of checkbox', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Present' })
    ).toHaveAttribute('type', 'checkbox');
  });

  test('dark class is applied to body after theme toggle', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    await expect(page.locator('body')).toHaveClass(/dark/);
  });

  test('dark class is removed after toggling back to light', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    await expect(page.locator('body')).not.toHaveClass(/dark/);
  });

  /*
toHaveClass(/dark/) uses a regular expression because an element can have multiple
CSS classes at the same time. Matching with a regex simply checks that the "dark"
class is present, without depending on the exact order or other class names.
*/
test.describe('Assertions — Page Level', () => {

  test('page has the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Intern Dashboard/);
  });

  test('page URL is the root path', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('http://localhost:5173/');
  });

});
/*
toHaveScreenshot() captures a baseline screenshot the first time the test runs.
On the second run, Playwright compares the current page with the saved baseline
and the test passes if they match. If any visible UI changes, such as text,
layout, or styling, the comparison fails and Playwright highlights the differences.
*/
})