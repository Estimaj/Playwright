import { test as base } from '@playwright/test';
import { HomepagePage } from '../pages/website-livewire/homepage.page';
import { AdminLoginPage } from '../pages/admin/login.page';

/**
 * Base fixtures that extend Playwright's test object
 * These fixtures provide page objects to tests
 */

type BaseFixtures = {
  homepagePage: HomepagePage;
  adminLoginPage: AdminLoginPage;
};

/**
 * Extended test object with custom fixtures
 * Use this instead of the default test from '@playwright/test'
 * 
 * Example usage:
 * import { test } from '../fixtures/base.fixtures';
 * 
 * test('example', async ({ homepagePage }) => {
 *   await homepagePage.navigate();
 * });
 */
export const test = base.extend<BaseFixtures>({
  /**
   * Homepage page object fixture for Website-Livewire
   */
  homepagePage: async ({ page }, use) => {
    const homepagePage = new HomepagePage(page);
    await use(homepagePage);
  },

  /**
   * Admin login page object fixture
   */
  adminLoginPage: async ({ page }, use) => {
    const adminLoginPage = new AdminLoginPage(page);
    await use(adminLoginPage);
  },
});

export { expect } from '@playwright/test';

