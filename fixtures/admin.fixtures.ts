import { test as base } from '@playwright/test';
import { AdminLoginPage } from '../pages/admin/login.page';
import { DashboardPage } from '../pages/admin/dashboard.page';

/**
 * Admin fixtures that extend Playwright's test object
 * These fixtures provide admin platform page objects to tests
 */
type AdminFixtures = {
  adminLoginPage: AdminLoginPage;
  dashboardPage: DashboardPage;
};

/**
 * Extended test object with admin fixtures
 * Use this instead of the default test when working with admin pages
 */
export const test = base.extend<AdminFixtures>({
  /**
   * Admin login page object fixture
   */
  adminLoginPage: async ({ page }, use) => {
    const adminLoginPage = new AdminLoginPage(page);
    await use(adminLoginPage);
  },

  /**
   * Admin dashboard page object fixture
   */
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';


