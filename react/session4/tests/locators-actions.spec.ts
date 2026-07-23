import { test, expect } from '@playwright/test';

test.describe('Locator Chaining and Filtering', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('finds Rahul\'s Remove button using filter', async ({ page }) => {
    const rahulRow = page.getByRole('row').filter({ hasText: 'Rahul' });
    const removeButton = rahulRow.getByRole('button', { name: 'Remove' });

    await expect(removeButton).toBeVisible();
  });

  test('finds Priya\'s score using filter and chaining', async ({ page }) => {
    const priyaRow = page.getByRole('row').filter({ hasText: 'Priya' });

    await expect(priyaRow).toBeVisible();
    await expect(priyaRow.getByText('78')).toBeVisible();
  });

  /*
Using .filter({ hasText: "Priya" }) is safer because it identifies the row
based on its actual content instead of its position in the table. If rows are
added, removed, or reordered, the locator will still find the correct row.
Using .nth(1) depends on the row index, which can change over time and make
the test fail even though the application's behavior is correct.
*/

test('counts only the rows that show Pass badge', async ({ page }) => {

  const passingRows = page.getByRole('row').filter({
    has: page.getByText('Pass'),
  });

  await expect(passingRows).toHaveCount(3);
  /*
The DOM snapshot was the most useful because it showed the exact page structure
at the moment the assertion failed, making it easy to verify that only four
elements existed instead of nine. This confirmed the failure was caused by an
incorrect expectation rather than a rendering or network issue.
*/
});

test('counts only the rows that show Fail badge', async ({ page }) => {
  const failingRows = page.getByRole('row').filter({
    has: page.getByText('Fail'),
  });

  await expect(failingRows).toHaveCount(1);
});
/*
filter({ hasText: "Pass" }) checks whether the element contains the given text
anywhere within its content. On the other hand, filter({ has: page.getByText("Pass") })
looks for a specific child element that matches the locator. Use hasText when
you only need to verify the presence of text, and use has when you want to
target an element based on one of its nested elements.
*/
test('first Remove button belongs to the first intern', async ({ page }) => {

  const firstRemove = page.getByRole('button', { name: 'Remove' }).first();
  await expect(firstRemove).toBeVisible();
});

test('last Remove button belongs to the last intern', async ({ page }) => {
  const lastRemove = page.getByRole('button', { name: 'Remove' }).last();
  await expect(lastRemove).toBeVisible();
});

test('second row is accessible by index', async ({ page }) => {
  const secondRow = page.getByRole('row').nth(1);
  await expect(secondRow).toBeVisible();
});

/*
Using .first() or .nth() selects an element based only on its position in the
list. As long as the list order stays the same, the same intern will be removed
every time the test runs. However, if the list is sorted differently or new
items are added or removed, these locators may target a different intern and
cause the test to behave unexpectedly. It is safer to locate elements using
unique text or other stable attributes instead of relying on their position.
*/

});

test.describe('Scoped Locators', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('asserts score and badge inside Rahul\'s card only', async ({ page }) => {
    const rahulCard = page.getByRole('row').filter({ hasText: 'Rahul' });

    await expect(rahulCard.getByText('92')).toBeVisible();
    await expect(rahulCard.getByText('Pass')).toBeVisible();
    await expect(rahulCard.getByRole('button', { name: 'Remove' })).toBeVisible();
  });

  test('asserts different data in two different cards', async ({ page }) => {
    const rahulCard = page.getByRole('row').filter({ hasText: 'Rahul' });
    const amitCard  = page.getByRole('row').filter({ hasText: 'Amit' });

    await expect(rahulCard.getByText('Pass')).toBeVisible();
    await expect(amitCard.getByText('Fail')).toBeVisible();
  });

  /*
Scoped locators help limit the search to a specific section of the page instead
of searching the entire document. This is useful when multiple cards or list
items contain the same text or buttons, as it ensures the action is performed
on the correct card. Without scoped locators, the test may interact with the
wrong element and become unreliable as the page grows or changes.
*/
test('fills the form using scoped locators on the form container', async ({ page }) => {
  const form = page.getByRole('form', { name: 'Add Intern' });

  await form.getByLabel('Intern Name').fill('Vikram');
  await form.getByLabel('Score').fill('75');
  await form.getByRole('button', { name: 'Add Intern' }).click();

  await expect(page.getByRole('row').filter({ hasText: 'Vikram' })).toBeVisible();
});
/*
Scoping locators ensures the test interacts only with the intended form or section.
It prevents filling inputs with the same labels in another form and avoids clicking
buttons with the same name in a different section, making the test more reliable.
*/

});

test.describe('Actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('fill sets the input value directly', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram');

    await expect(page.getByPlaceholder('Name')).toHaveValue('Vikram');
  });

  test('selectOption selects by visible label text', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Role' }).selectOption({ label: 'Backend' });

    await expect(page.getByRole('combobox', { name: 'Role' })).toHaveValue('Backend');
  });

  test('selectOption selects by value attribute', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Role' }).selectOption('Frontend');

    await expect(page.getByRole('combobox', { name: 'Role' })).toHaveValue('Frontend');
  });

  /*
selectOption("Backend") selects an option using its value attribute, while
selectOption({ label: "Backend" }) selects it using the visible text shown to users.
Using the value is generally more resilient because labels may change for UI or
localization updates, whereas values are usually kept stable for application logic.
*/
test('checkbox is checked by default', async ({ page }) => {
  const presentCheckbox = page.getByRole('checkbox', { name: 'Present' });
  await expect(presentCheckbox).toBeChecked();
});

test('uncheck removes the checked state', async ({ page }) => {
  const presentCheckbox = page.getByRole('checkbox', { name: 'Present' });

  await presentCheckbox.uncheck();

  await expect(presentCheckbox).not.toBeChecked();
});

test('check re-applies the checked state', async ({ page }) => {
  const presentCheckbox = page.getByRole('checkbox', { name: 'Present' });

  await presentCheckbox.uncheck();
  await presentCheckbox.check();

  await expect(presentCheckbox).toBeChecked();
});

/*
check() ensures the checkbox is checked only if needed, making the test reliable.
Using click() simply toggles the checkbox, so if it is already checked, click()
will uncheck it and leave the element in the wrong state, causing inconsistent tests.
*/

test('Tab moves focus from name input to score input', async ({ page }) => {
  const nameInput  = page.getByPlaceholder('Name');
  const roleSelect = page.getByRole('combobox', { name: 'Role' });
  const scoreInput = page.getByPlaceholder('Score');

  await nameInput.focus();
  await expect(nameInput).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(roleSelect).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(scoreInput).toBeFocused();
});

test('Enter inside name input submits the form', async ({ page }) => {
  await page.getByPlaceholder('Name').fill('Vikram');
  await page.getByPlaceholder('Score').fill('75');
  await page.getByPlaceholder('Name').press('Enter');

  await expect(page.getByRole('row').filter({ hasText: 'Vikram' })).toBeVisible();
});
/*
locator.press("Tab") sends the key press to a specific element after ensuring it
is focused, while page.keyboard.press("Tab") sends the key press to whichever
element is currently focused on the page. Use locator.press() when you want to
target a particular element and page.keyboard.press() for global keyboard actions.
*/
test('clear() empties the input', async ({ page }) => {
  const scoreInput = page.getByPlaceholder('Score');

  await scoreInput.fill('92');
  await scoreInput.clear();

  await expect(scoreInput).toHaveValue('0');
});

test('type() fires individual key events', async ({ page }) => {

  await page.getByLabel('Search').type('Rah');

  await expect(page.getByRole('row').filter({ hasText: 'Rahul' }).first()).toBeVisible();
});
/*
type() enters text one character at a time, triggering keyboard events like a real user.
This is useful for inputs such as search boxes with live suggestions or autocomplete,
where the application reacts to each keystroke. In these cases, fill() may not trigger
the expected behavior because it sets the value all at once.
*/

/*
test('debug: inspect form state mid-test', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Name').fill('Debug Intern');
  await page.getByPlaceholder('Score').fill('80');
  await page.getByRole('button', { name: 'Add Intern' }).click();
  await expect(page.getByRole('heading', { name: 'Debug Intern' })).toBeVisible();
});

page.pause() is useful for checking whether a locator is targeting the correct
element and for inspecting the page when an element is missing or not yet visible.
It lets you interact with the page manually, making UI and timing issues easier to diagnose.
In automated CI runs, replace page.pause() with proper automated steps so the test
can complete without manual intervention.
*/

});
