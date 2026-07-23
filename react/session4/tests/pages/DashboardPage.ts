import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
  readonly page:        Page;
  readonly nameInput:   Locator;
  readonly scoreInput:  Locator;
  readonly roleSelect:  Locator;
  readonly addButton:   Locator;
  readonly resetButton: Locator;
  readonly searchInput: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page        = page;
    this.nameInput   = page.getByPlaceholder('Name');
    this.scoreInput  = page.getByPlaceholder('Score');
    this.roleSelect  = page.locator('select[name="role"]');
    this.addButton   = page.getByRole('button', { name: 'Add Intern' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.searchInput = page.getByPlaceholder('Search intern...');
    this.themeToggle = page.getByRole('button', { name: /switch to/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  async addIntern(name: string, score: string, role = 'Frontend') {
    await this.nameInput.fill(name);
    await this.scoreInput.clear();
    await this.scoreInput.fill(score);
    await this.roleSelect.selectOption(role);
    await this.addButton.click();
  }

  async search(query: string) {
    await this.searchInput.fill(query);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  // Navigate from intern name heading up to the parent card div
  internCard(name: string): Locator {
    return this.page.getByRole('heading', { name }).locator('..');
  }

  removeButtonFor(name: string): Locator {
    return this.page.getByRole('row').filter({ hasText: name }).getByRole('button', { name: 'Remove' });
  }

  get internCount(): Locator {
    return this.page.getByRole('heading', { level: 3 });
  }
  validationError(): Locator {
  return this.page.getByRole('alert').or(this.page.locator('[class*="error"]'));
}
}
/*
The Page Object Model keeps locators and page interactions in one place, making
tests easier to maintain. If the "Name" placeholder is renamed in the React
component, only the locator in the page object needs to be updated instead of
changing every test that uses it.
*/