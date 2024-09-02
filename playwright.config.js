// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: 'tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html', { open: 'never' }]],

  /* Set expect timeout */
  expect: {
    timeout: 60000,
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    launchOptions: {
      /* Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on */
      slowMo: 1_000,
    },

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://simonsmith.github.io',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: {
      mode: 'on',
    },

    /* Capture screenshot after each test failure. */
    screenshot: {
      fullPage: true,
      mode: 'only-on-failure',
    },

    /* Record video only when retrying a test for the first time. */
    video: {
      mode: 'retain-on-failure',
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      /* Filter to only run tests with a title matching one of the patterns. */
      grep: [new RegExp('@ui'), new RegExp('@regression')],
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
      /* Filter to only run tests with a title matching one of the patterns. */
      grep: [new RegExp('@ui')],
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
      /* Filter to only run tests with a title matching one of the patterns. */
      grep: [new RegExp('@ui')],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
