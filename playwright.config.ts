import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

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

    /* Admin Authentication Setup - Runs ONCE before admin tests */
    {
      name: 'admin-auth-setup',
      testMatch: '**/admin/auth.setup.ts',
      use: {
        baseURL: 'https://admin.joaoestima.com',
      },
    },

    /* Admin Platform Projects - Use authenticated state */
    {
      name: 'admin-chromium',
      testDir: './tests/admin',
      testIgnore: '**/auth.setup.ts', // Don't run setup as a regular test
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://admin.joaoestima.com',
        storageState: '.auth/admin-user.json', // Load saved auth state
      },
      dependencies: ['admin-auth-setup'], // Run setup first
    },
    {
      name: 'admin-firefox',
      testDir: './tests/admin',
      testIgnore: '**/auth.setup.ts',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://admin.joaoestima.com',
        storageState: '.auth/admin-user.json',
      },
      dependencies: ['admin-auth-setup'],
    },
    {
      name: 'admin-webkit',
      testDir: './tests/admin',
      testIgnore: '**/auth.setup.ts',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://admin.joaoestima.com',
        storageState: '.auth/admin-user.json',
      },
      dependencies: ['admin-auth-setup'],
    },
  ],
});
