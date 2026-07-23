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


//Playwright Session2 Activities:

test('dashboard smoke test', async ({ page }) => {
  await page.goto('/');

  await expect.soft(page.getByRole('heading', { name: 'Intern Dashboard' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Add Intern' })).toBeVisible();
  await expect.soft(page.getByPlaceholder('Search by name or role')).toBeVisible();
  await expect.soft(page.getByRole('row')).toHaveCount(4);
});

/*
Soft assertions are useful for smoke tests where you want to check several
independent parts of a page in a single run. If one check fails, the remaining
checks still execute, allowing Playwright to report all failures together
instead of stopping at the first failed assertion.
*/

test('uses mocked intern data', async ({ page }) => {
  await page.route('**/api/interns', route =>
    route.fulfill({
      body: JSON.stringify([
        { id: 1, name: 'Vikram', role: 'Backend', score: 95, present: true },
      ]),
    })
  );

  await page.goto('/');

  await expect(page.getByText('Vikram')).toBeVisible();
  await expect(page.getByText('Rahul')).not.toBeVisible();
});

/*
page.route() intercepts a network request and returns mock data instead of
calling the real backend. This makes the test independent of the API and
ensures consistent results every time it runs. It is useful for testing
different scenarios without changing the backend or database.
*/

/*
import { test as base } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

type Fixtures = {
  dashboard: DashboardPage;
};

export const test = base.extend<Fixtures>({
  dashboard: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);
    await page.goto('/');
    await use(dashboard);
  },
});

export { expect } from '@playwright/test';



import { test, expect } from './fixtures';

test('adds a new intern', async ({ dashboard }) => {
  await dashboard.addIntern('Vikram', 'Backend', 95);
  await expect(dashboard.page.getByText('Vikram')).toBeVisible();
});


Fixtures provide reusable setup that is injected into each test as a parameter,
while beforeEach only runs setup code before every test. A fixture can create
objects like page models, perform navigation, and automatically clean up after
the test, making test files shorter and easier to maintain.
*/


test('intern list visual comparison', async ({ page }) => {
  await page.goto('/');

  const internList = page.getByRole('table');

  // Creates the baseline on the first run
  await expect(internList).toHaveScreenshot('intern-list.png');

  await page.getByLabel('Intern Name').fill('Vikram');
  await page.getByLabel('Score').fill('90');
  await page.getByRole('button', { name: 'Add Intern' }).click();

  // Verifies the UI has changed
  await expect(internList).not.toHaveScreenshot('intern-list.png');
});

/*
On the first run, Playwright saves the screenshot as a baseline image. On
later runs, it compares the current UI with that baseline and reports any
visual differences. Baseline images are stored in a snapshot folder next to
the test file and are named using the screenshot name and browser/project.
*/



test('background CSS variable changes after theme toggle', async ({ page }) => {
  await page.goto('/');

  const before = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue('--background-color')
      .trim()
  );

  await page.getByRole('button', { name: /switch to dark mode/i }).click();

  const after = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue('--background-color')
      .trim()
  );

  expect(after).not.toBe(before);
});

/*
page.evaluate() runs JavaScript inside the browser, allowing tests to access
the DOM and browser APIs directly. It is useful for reading values such as CSS
variables that are not exposed through normal Playwright locators or assertions.
*/