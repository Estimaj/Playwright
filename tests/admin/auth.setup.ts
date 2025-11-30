import { test as setup, expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/admin/login.page';

/**
 * Admin Authentication Setup
 * 
 * This setup script runs ONCE before all admin tests.
 * It logs in with real credentials and saves the authentication state
 * to be reused across all admin tests for faster execution.
 * 
 * Authentication state is saved to: .auth/admin-user.json
 * 
 * Prerequisites:
 * - .env file must exist with ADMIN_EMAIL and ADMIN_PASSWORD
 * - Admin login page must be accessible
 */
setup('authenticate as admin', async ({ page }) => {
  const loginPage = new AdminLoginPage(page);
  
  // Verify environment variables are set
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error(
      'ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file. ' +
      'Copy .env.example to .env and fill in your credentials.'
    );
  }
  
  console.log(`🔐 Authenticating as: ${process.env.ADMIN_EMAIL}`);
  
  // Navigate to login page
  await loginPage.navigate();
  
  // Verify login page loaded
  await loginPage.verifyLoginPageLoaded();
  
  // Perform login with credentials from environment variables
  await loginPage.login(
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PASSWORD
  );
  
  // Wait for successful login redirect to dashboard
  await page.waitForURL(/\/dashboard/, { timeout: 10000 });
  
  // Verify we're on the dashboard page (successful login)
  await expect(page).toHaveURL(/\/dashboard/);
  
  // Additional verification: Check for dashboard content to ensure we're fully logged in
  await expect(page.getByRole('heading', { name: 'Dashboard' }).first()).toBeVisible();
  await expect(page.getByText('You\'re logged in!')).toBeVisible();
  
  console.log('✅ Authentication successful! Saving state...');
  
  // Save the authenticated state to file
  // This includes cookies, localStorage, sessionStorage, etc.
  await page.context().storageState({ 
    path: '.auth/admin-user.json' 
  });
  
  console.log('✅ Authentication state saved to .auth/admin-user.json');
});

