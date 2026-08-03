import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  /*
Allows Playwright to run multiple tests at the same time.
This speeds up the overall test execution.
*/
  fullyParallel: true,
  /*
Retries failed tests automatically if they fail.
In CI, it retries twice; locally, it doesn't retry.
*/
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  timeout: 30000,

  use: {
    /*
    Sets the default URL for all tests.
    Relative URLs in page.goto() use this as the starting point.
    */
    baseURL: "http://localhost:5173",
    /*
    Records a trace when a test fails on its first attempt.
    The trace helps debug the test during the retry.
    */
    trace: "on",
    screenshot: "only-on-failure",
      video: 'on-first-retry',       // record a video when a test retries
  headless: true,
  },

  expect: { timeout: 5_000 },     // assertion timeout — separate from test timeout

/*
timeout sets the maximum time allowed for the entire test to complete, including
all actions and assertions. expect.timeout controls how long a single assertion
waits for a condition to become true, such as an element appearing after an
API call or animation, without extending the overall test timeout.
*/

  projects: [
    /*
Uses Playwright's built-in Desktop Chrome settings.
It automatically sets the viewport size, user agent, and device pixel ratio.
*/
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
      { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  /*
...devices['Pixel 5'] applies a predefined mobile device configuration. It sets
the viewport size, the user agent string, and touch/mobile capabilities so the
browser behaves like a real Pixel 5 during testing.
*/

  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});

/*
Some mobile device presets available in Playwright:
- 'Galaxy S8'
- 'iPhone SE'
*/