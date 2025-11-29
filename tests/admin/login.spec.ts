import { test, expect } from '../../fixtures/admin.fixtures';

/**
 * Admin Login Tests
 * Tests for admin platform login functionality
 * 
 * Note: These tests override storageState to start unauthenticated
 * since they're testing the login process itself
 */

test.describe('Admin Login', () => {
  // Override storageState for login tests - start without authentication
  test.use({ storageState: { cookies: [], origins: [] } });

  test('@smoke @critical should access login page and display login form', async ({ adminLoginPage, page }) => {
    // Arrange: Navigate to login page
    await adminLoginPage.navigate();

    // Assert: Verify login page is loaded with all form elements visible
    await adminLoginPage.verifyLoginPageLoaded();
    await expect(page).toHaveURL(/\/login/);
  });

  test('@smoke should fill out login form with credentials', async ({ adminLoginPage, page }) => {
    // Arrange: Navigate to login page
    await adminLoginPage.navigate();

    // Act: Fill out the login form
    await adminLoginPage.fillEmail('admin@example.com');
    await adminLoginPage.fillPassword('password123');

    // Assert: Verify form fields contain the entered values
    await expect(adminLoginPage.emailInput).toHaveValue('admin@example.com');
    await expect(adminLoginPage.passwordInput).toHaveValue('password123');
    await expect(adminLoginPage.loginButton).toBeVisible();
  });

  test('should fail login with invalid credentials', async ({ adminLoginPage, page }) => {
    // Arrange: Navigate to login page
    await adminLoginPage.navigate();

    // Act: Perform login action with invalid credentials
    await adminLoginPage.login('admin@example.com', 'password123');

    // Assert: Verify login failed and error message is displayed
    // Wait a moment for the error message to appear (form submission takes time)
    await adminLoginPage.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    await expect(page).toHaveURL(/\/login/); // Should still be on login page
    await expect(adminLoginPage.errorMessage).toHaveText('These credentials do not match our records.');
  });

  test('@smoke @critical should successfully login with valid credentials', async ({ adminLoginPage, page }) => {
    // Verify environment variables are set
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      test.skip(true, 'ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file');
    }

    // Arrange: Navigate to login page
    await adminLoginPage.navigate();
    await adminLoginPage.verifyLoginPageLoaded();

    // Act: Perform login with valid credentials from environment variables
    await adminLoginPage.login(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!
    );

    // Assert: Verify successful login by checking redirect to dashboard
    await page.waitForURL(/\/dashboard/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Additional verification: Check for dashboard content
    await expect(page.getByRole('heading', { name: 'Dashboard' }).first()).toBeVisible();
    await expect(page.getByText('You\'re logged in!')).toBeVisible();
  });
});

