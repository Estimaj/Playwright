import { test as base } from '@playwright/test';
import { AdminLoginPage } from '../pages/admin/login.page';

/**
 * Authentication fixtures for tests that require authenticated state
 */

type AuthFixtures = {
  authenticatedAdminPage: AdminLoginPage;
};

/**
 * Extended test object with authentication fixtures
 * Use this for tests that require authentication
 * 
 * Example usage:
 * import { test } from '../fixtures/auth.fixtures';
 * 
 * test('admin dashboard', async ({ authenticatedAdminPage }) => {
 *   // Already logged in
 *   await authenticatedAdminPage.navigate();
 * });
 */
export const test = base.extend<AuthFixtures>({
  /**
   * Authenticated admin page fixture
   * Automatically logs in before test and logs out after test
   * 
   * Note: Update credentials and login flow based on actual admin authentication
   */
  authenticatedAdminPage: async ({ page }, use) => {
    const adminLoginPage = new AdminLoginPage(page);
    
    // Setup: Login before test
    // TODO: Update with actual admin login credentials and flow
    await adminLoginPage.navigate();
    // await adminLoginPage.login('admin@example.com', 'password123');
    // await page.waitForURL(/dashboard/); // Wait for redirect after login
    
    // Use the authenticated page in test
    await use(adminLoginPage);
    
    // Teardown: Logout after test (optional)
    // await page.click('[data-testid="logout"]');
    // await adminLoginPage.verifyLoginPageLoaded();
  },
});

export { expect } from '@playwright/test';

