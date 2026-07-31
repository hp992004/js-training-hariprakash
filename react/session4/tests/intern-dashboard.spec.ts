import { test, expect } from '@playwright/test';

test.describe('Intern Dashboard', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the page title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Intern Dashboard' })).toBeVisible();
  });

/*
Open the home page before each test starts.
This keeps every test starting from the same place.
It also avoids writing page.goto('/') in every test.
The tests become cleaner and easier to update.
*/

  test('shows the initial intern names', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Priya' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Amit' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sneha' })).toBeVisible();
  });

  test('shows the correct number of intern cards', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
});

/*
toBeVisible() checks that an element exists and is visible on the page.
toBeInTheDocument() only checks that the element is present in the DOM.
An element can be in the document but still be hidden.
Use toBeVisible() when users should actually be able to see it.
*/

test('shows the theme toggle button', async ({ page }) => {
  await expect(
    page.getByRole('button', { name: /switch to dark mode/i })
  ).toBeVisible();
});


test.describe('Locator Practice — getByRole', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('finds the Add Intern button by role', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Add Intern' });
    await expect(addButton).toBeVisible();
  });

  test('finds the heading by role', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Intern Dashboard' });
    await expect(heading).toBeVisible();
  });

  test('finds the name input by role', async ({ page }) => {
    const nameInput = page.getByRole('textbox', { name: 'Name' });
    await expect(nameInput).toBeVisible();
  });

});
/*
getByRole finds elements the same way users and screen readers do.
It makes tests more reliable by using accessible roles and names.
Unlike getByTestId, it doesn't rely on custom attributes.
This encourages writing accessible and user-friendly applications.
*/

test('finds the name input by placeholder', async ({ page }) => {
  const nameInput = page.getByPlaceholder('Name');
  await expect(nameInput).toBeVisible();
  await expect(nameInput).toBeEmpty();
});

test('finds the score input by placeholder', async ({ page }) => {
  const scoreInput = page.getByPlaceholder('Score');
  await expect(scoreInput).toBeVisible();
});

test('finds text with exact matching', async ({ page }) => {
  await expect(page.getByText('Rahul', { exact: true }).first()).toBeVisible();
});

test('finds text with regex matching', async ({ page }) => {
  await expect(page.getByText(/Score: \d+/).first()).toBeVisible();
});

test('asserts that an absent element is not visible', async ({ page }) => {
  await expect(page.getByText('Placeholder')).not.toBeVisible();
});

/*
getByText() can match more than one element with the same text.
Using .first() selects the first matching element.
This removes ambiguity and ensures the test targets a single element.
It makes the locator more predictable and reliable.
*/

test.describe('Assertions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('heading has the correct text', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toHaveText('Intern Dashboard');
  });

  test('theme toggle button contains the word "Dark"', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toContainText('Dark');
  });

  test('error message is not visible initially', async ({ page }) => {
    await expect(page.getByText('Name is required')).not.toBeVisible();
  });

});

/*
toHaveText() checks that the element's text matches exactly.
toContainText() checks that the element includes the expected text.
Use toHaveText() for an exact match.
Use toContainText() when only part of the text needs to be verified.
*/

test('name input is empty initially', async ({ page }) => {
  await expect(page.getByPlaceholder('Name')).toHaveValue('');
});

test('score input is 0 initially', async ({ page }) => {
  await expect(page.getByPlaceholder('Score')).toHaveValue('0');
});


test('correct number of Remove buttons matches the intern count', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
});

/*
    Error: expect(locator).toHaveCount(expected) failed

    Locator:  getByRole('button', { name: 'Remove'})
    Expected: 5
    Received: 4
    Timeout:  5000ms

Changing toHaveCount(5) makes the test fail because only 4 elements are found.
Playwright keeps checking until the expected count is reached.
It waits for about 5 seconds before timing out and reporting the failure.
The error shows the expected count, the actual count, and the locator used.
*/

test.describe('Add Intern Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('adds a new intern and shows them in the list', async ({ page }) => {

    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('88');


    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByText('Vikram').first()).toBeVisible();
    await expect(page.getByText('Vikram — 88')).toBeVisible();
  });

  test('intern count increases after adding', async ({ page }) => {

    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByRole('button', { name: 'Add Intern' }).click();


    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(5);
  });

  test('form clears after successful submission', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByPlaceholder('Score').fill('88');
    await page.getByRole('button', { name: 'Add Intern' }).click();


    await expect(page.getByPlaceholder('Name')).toHaveValue('');
  });

});

/*
This test checks that the complete application works from the user's perspective.
It verifies that different components work together correctly.
A unit test only checks the AddInternForm component in isolation.
This test can catch integration issues that unit tests might miss.
*/

test('shows validation error when name is empty', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(page.getByText('Name is required')).toBeVisible();
});

test('does not add intern when form is invalid', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
});

test('validation error disappears after name is entered', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Intern' }).click();
  await expect(page.getByText('Name is required')).toBeVisible();

  await page.getByPlaceholder('Name').fill('Vikram');

  await expect(page.getByText('Name is required')).not.toBeVisible();
});

/*
not.toBeVisible() checks that the element is present but hidden from the user.
Playwright works with real browser pages, so visibility is more important than just existence.
Unlike queryByText() in Vitest, it verifies what the user can actually see.
This makes the test closer to real user behavior.
*/
test.describe('Remove Intern Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('removes an intern when Remove is clicked', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();

    await page.getByRole('button', { name: 'Remove' }).first().click();

    await expect(page.getByRole('heading', { name: 'Rahul' })).not.toBeVisible();
  });

  test('intern count decreases after removal', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    await page.getByRole('button', { name: 'Remove' }).first().click();

    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(3);
  });

});

/*
An alternative is to use locator.filter() to find the card that contains "Rahul".
Then search for the Remove button only within that filtered card.
Example:
page.locator('.card').filter({ hasText: 'Rahul' }).getByRole('button', { name: 'Remove' }).click();
*/
test.describe('Theme Toggle Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toggle button label changes from Dark to Light after click', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();

    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    await expect(
      page.getByRole('button', { name: /switch to light mode/i })
    ).toBeVisible();
  });

  test('toggle switches back on second click', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

});

/*
This test checks that the navigation works correctly in the real application.
It verifies page navigation, routing, and user interactions in the browser.
A Vitest unit test only checks the Navbar component by itself.
It cannot verify that clicking a link actually changes the page.
*/

});

/*
UI mode showed each action and assertion in order as the test ran.
I could inspect the page at every step to see what Playwright was interacting with.
This level of detail is not available in the terminal output.
*/

/*
Headless mode runs tests without opening a browser window, making them faster.
Headed mode opens the browser so you can watch the test as it runs.
Use headless mode for regular testing and CI pipelines.
Use headed mode when debugging or checking UI behavior.
*/

/*
The HTML report showed a detailed summary of each test run.
It included screenshots, execution time, and the steps performed during the test.
I could also see which tests passed or failed with more context.
This information is much easier to understand than the terminal output alone.
*/

/*
Timeline: Helps identify the exact step where the test failed.
Screenshots: Shows what the page looked like when the failure occurred.
Network: Helps find failed or slow API requests that affect the test.
DOM Snapshot: Lets you inspect the page structure and verify element states at that moment.
*/
