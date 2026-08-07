import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

test.describe('Journeys via Page Object', () => {

  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('adds a new intern', async () => {
    await dashboard.addIntern('Vikram', '88', 'Backend');

    await expect(dashboard.internCard('Vikram')).toBeVisible();
    await expect(dashboard.internCount).toHaveCount(5);
  });

  test('searches and filters the list', async () => {
    await dashboard.search('Rah');

    await expect(dashboard.internCount).toHaveCount(1);
    await expect(dashboard.internCard('Rahul')).toBeVisible();
  });

  test('clears search and restores all interns', async () => {
    await dashboard.search('Rahul');
    await dashboard.clearSearch();

    await expect(dashboard.internCount).toHaveCount(4);
  });

  test('removes an intern by name', async () => {
    await dashboard.removeButtonFor('Rahul').click();

    await expect(dashboard.internCard('Rahul')).not.toBeVisible();
    await expect(dashboard.internCount).toHaveCount(3);
  });

  test('toggles theme and button label updates', async () => {
    await dashboard.toggleTheme();

    await expect(dashboard.themeToggle).toContainText('Light');
  });
/*
dashboard.themeToggle is initialized in the constructor by locating the theme
toggle button once and reusing that locator throughout the page object. Checking
toContainText("Light") confirms the toggle succeeded because the button now
indicates the next available action, meaning the application is currently in
dark mode and clicking it again would switch back to light mode.
*/
  test('shows validation error on empty submit', async ({ page }) => {
  await dashboard.addButton.click();

  await expect(page.getByText('Name is required')).toBeVisible();
});
/*
locatorA.or(locatorB) creates a locator that matches either of the two locators.
It is useful when the UI can display one of multiple valid elements, such as
a dialog or the main page after loading, making tests more flexible and reliable.
*/

test('chromium-only feature check', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'This test targets Chromium-specific behaviour only');

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Intern Dashboard' })).toBeVisible();
});

/*
test.skip(browserName !== 'chromium') is useful when testing features that are
only fully supported in Chromium, such as the File System Access API. Skipping
the test on Firefox and WebKit avoids failures caused by browser limitations
rather than problems in the application.
*/
});