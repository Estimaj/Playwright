import { test, expect } from '../../fixtures/base.fixtures';

/**
 * Admin Login Tests
 * Tests for admin platform login functionality
 */

test.describe('Admin Login', () => {
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

  test('should attempt login with credentials and fail', async ({ adminLoginPage, page }) => {
    // Arrange: Navigate to login page
    await adminLoginPage.navigate();

    // Act: Perform login action with invalid credentials
    await adminLoginPage.login('admin@example.com', 'password123');

    // Assert: Verify login failed and error message is displayed
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/login/); // Should still be on login page
    await adminLoginPage.verifyErrorMessage();
    await expect(adminLoginPage.errorMessage).toHaveText('These credentials do not match our records.');
  });
});

