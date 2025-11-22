import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for multiple platforms and browsers */
  projects: [
    /* Website-Livewire Platform Projects */
    {
      name: 'website-livewire-chromium',
      testDir: './tests/website-livewire',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://joaoestima.com',
      },
    },
    {
      name: 'website-livewire-firefox',
      testDir: './tests/website-livewire',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://joaoestima.com',
      },
    },
    {
      name: 'website-livewire-webkit',
      testDir: './tests/website-livewire',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://joaoestima.com',
      },
    },

    /* Admin Platform Projects */
    {
      name: 'admin-chromium',
      testDir: './tests/admin',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://admin.joaoestima.com',
      },
    },
    {
      name: 'admin-firefox',
      testDir: './tests/admin',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://admin.joaoestima.com',
      },
    },
    {
      name: 'admin-webkit',
      testDir: './tests/admin',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://admin.joaoestima.com',
      },
    },
  ],
});
