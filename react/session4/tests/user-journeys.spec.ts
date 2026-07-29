import { test, expect } from '@playwright/test';

test.describe('User Journey — Add Intern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('user fills the form and the new intern appears in the list', async ({ page }) => {
    // Confirm initial state
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    // Fill the form
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('88');
    await page.locator('select[name="role"]').selectOption('Frontend');

    // Submit
    await page.getByRole('button', { name: 'Add Intern' }).click();

    // New intern's card heading appears
    await expect(page.getByRole('heading', { name: 'Vikram' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(5);
  });

  test('new intern shows Pass badge when score is 88', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('88');
    await page.getByRole('button', { name: 'Add Intern' }).click();


    const vikramRow = page.getByRole('row').filter({ hasText: 'Vikram' });
    await expect(vikramRow.getByText('Pass')).toBeVisible();
  });

  test('new intern shows Fail badge when score is 45', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Ravi');
    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('45');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    const raviRow = page.getByRole('row').filter({ hasText: 'Ravi' });
    await expect(raviRow.getByText('Fail')).toBeVisible();
  });

  test('form resets to empty after successful submission', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByPlaceholder('Name')).toHaveValue('');
  });

  /*
This journey test verifies the complete user flow from filling the form to
seeing the new intern appear in the dashboard. Unlike the Vitest unit test
for AddInternForm, it confirms that the form, state updates, and UI all work
together correctly in a real browser.
*/
});

test.describe('User Journey — Add Intern Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows error when submitting with empty name', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByText('Name is required')).toBeVisible();
  });

  test('does not add intern when name is empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Intern' }).click();

    // Count should remain unchanged
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
  });

  test('error clears after entering a valid name and resubmitting', async ({ page }) => {
    // Trigger error
    await page.getByRole('button', { name: 'Add Intern' }).click();
    await expect(page.getByText('Name is required')).toBeVisible();

    // Fix and resubmit
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByText('Name is required')).not.toBeVisible();
  });

  test('shows error when score is above 100', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('150');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByText('Score must be between 0 and 100')).toBeVisible();
  });

});

test.describe('User Journey — Search and Filter', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('typing in search filters the intern list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Priya' })).toBeVisible();

    await page.getByLabel('Search').fill('Rah');

    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Priya' })).not.toBeVisible();
  });

  test('clearing search restores all interns', async ({ page }) => {
    await page.getByLabel('Search').fill('Rahul');
    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Priya' })).not.toBeVisible();

    await page.getByLabel('Search').clear();

    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Priya' })).toBeVisible();
  });

  test('search is case-insensitive', async ({ page }) => {
    await page.getByLabel('Search').fill('rahul');
    /*
The Playwright Inspector showed each action as it executed and highlighted the
locator on the page, making it clear that no element matched "Nobody". This made
it easier to verify the page state and understand exactly why the locator failed,
which is harder to visualize from the terminal error message alone.
*/

    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Priya' })).not.toBeVisible();

  });

  test('no match shows empty state message', async ({ page }) => {
    await page.getByLabel('Search').fill('zzz');

    await expect(page.getByRole('heading', { name: 'Rahul' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Priya' })).not.toBeVisible();
    await expect(page.getByText('No interns found')).toBeVisible();
  });
/*
type() enters text one character at a time, just like a real user typing into
the search box. This triggers keyboard events for every keystroke, allowing
features such as live search, autocomplete, and suggestions to behave naturally.
If the search filters on each change, both type() and fill() will work correctly.
*/
});

test.describe('User Journey — Remove Intern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clicking Remove on Rahul\'s card removes Rahul from the list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();

    // Scope to Rahul's row via role="row" filter (InternRow has role="row")
    const rahulRow = page.getByRole('row').filter({ hasText: 'Rahul' });
    await rahulRow.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByRole('heading', { name: 'Rahul' })).not.toBeVisible();
  });

  test('intern count decreases after removal', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    const rahulRow = page.getByRole('row').filter({ hasText: 'Rahul' });
    await rahulRow.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(3);
  });

  test('other interns remain after one is removed', async ({ page }) => {
    const rahulRow = page.getByRole('row').filter({ hasText: 'Rahul' });
    await rahulRow.getByRole('button', { name: 'Remove' }).click();

    // The three remaining intern cards are still visible
    await expect(page.getByRole('heading', { name: 'Priya' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Amit' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sneha' })).toBeVisible();
  });

  test('removed intern does not reappear after page interaction', async ({ page }) => {
    const rahulRow = page.getByRole('row').filter({ hasText: 'Rahul' });
    await rahulRow.getByRole('button', { name: 'Remove' }).click();

    // Trigger a re-render by toggling theme
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    await expect(page.getByRole('heading', { name: 'Rahul' })).not.toBeVisible();
  });
/*
Using getByRole('row').filter({ hasText: 'Rahul' }) scopes the Remove
button to Rahul's row, ensuring the correct intern is targeted. Using .first()
only selects the first Remove button, which can remove the wrong intern if the
list order changes or a new card is added above Rahul.
*/
});

test.describe('User Journey — Theme Toggle', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toggle button shows current mode to switch to', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

  test('clicking toggle switches to dark mode', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    // Button label updates — theme applied via inline styles, not a body class
    await expect(
      page.getByRole('button', { name: /switch to light mode/i })
    ).toBeVisible();
  });

  test('clicking toggle again switches back to light mode', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });
/*
Checking the button label confirms that the theme toggle updated the application's
state and reflects the current mode. If the app used a CSS class on the body or
root element instead of inline styles, it would be better to assert that the
appropriate class (such as "dark") was added or removed after toggling.
*/
});
