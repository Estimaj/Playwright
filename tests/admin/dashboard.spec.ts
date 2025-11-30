import { test, expect } from '../../fixtures/admin.fixtures';

/**
 * Admin Dashboard Tests
 * Tests for admin dashboard functionality and sidebar navigation
 * 
 * These tests use the authenticated state from auth.setup.ts
 */

test.describe('Admin Dashboard', () => {
  test('@smoke @critical should load dashboard correctly with authenticated user', async ({ dashboardPage, page }) => {
    // Arrange: Navigate to dashboard (using authenticated session)
    await dashboardPage.navigate();

    // Assert: Verify dashboard is loaded with all expected content
    await expect(page).toHaveURL(/\/dashboard/);
    await dashboardPage.verifyDashboardLoaded();
    
    // Verify specific dashboard elements
    await expect(dashboardPage.dashboardHeading).toBeVisible();
    await expect(dashboardPage.loggedInMessage).toBeVisible();
    await expect(dashboardPage.websiteStatusHeading).toBeVisible();
    await expect(dashboardPage.applicationHeading).toBeVisible();
    await expect(dashboardPage.laravelVersion).toBeVisible();
    await expect(dashboardPage.phpVersion).toBeVisible();
    await expect(dashboardPage.yearProgressHeading).toBeVisible();
    await expect(dashboardPage.yearProgressBar).toBeVisible();
  });

  test('@smoke should open and access sidebar menu', async ({ dashboardPage, page }) => {
    // Arrange: Navigate to dashboard
    await dashboardPage.navigate();

    // Act: Open sidebar menu
    await dashboardPage.openSidebar();

    // Assert: Verify sidebar is accessible and shows navigation links
    await dashboardPage.verifySidebarAccessible();
    await expect(dashboardPage.dashboardLink).toBeVisible();
    await expect(dashboardPage.usersLink).toBeVisible();
    await expect(dashboardPage.myBooksLink).toBeVisible();
    await expect(dashboardPage.importsLink).toBeVisible();
  });

  test('should navigate to Users page via sidebar', async ({ dashboardPage, page }) => {
    // Arrange: Navigate to dashboard
    await dashboardPage.navigate();

    // Act: Navigate to Users page via sidebar
    await dashboardPage.navigateToUsers();

    // Assert: Verify navigation to Users page
    await expect(page).toHaveURL(/\/users/);
  });

  test('should navigate to My Books page via sidebar', async ({ dashboardPage, page }) => {
    // Arrange: Navigate to dashboard
    await dashboardPage.navigate();

    // Act: Navigate to My Books page via sidebar
    await dashboardPage.navigateToMyBooks();

    // Assert: Verify navigation to My Books page
    await expect(page).toHaveURL(/\/books/);
  });

  test('should navigate to Imports page via sidebar', async ({ dashboardPage, page }) => {
    // Arrange: Navigate to dashboard
    await dashboardPage.navigate();

    // Act: Navigate to Imports page via sidebar
    await dashboardPage.navigateToImports();

    // Assert: Verify navigation to Imports page
    await expect(page).toHaveURL(/\/imports/);
  });

  test('should expand Finances menu and navigate to Cash Flow', async ({ dashboardPage, page }) => {
    // Arrange: Navigate to dashboard
    await dashboardPage.navigate();

    // Act: Expand Finances menu and navigate to Cash Flow
    await dashboardPage.navigateToCashFlow();

    // Assert: Verify navigation to Cash Flow page
    await expect(page).toHaveURL(/\/finances/);
  });

  test('should expand Finances menu and navigate to Stocks', async ({ dashboardPage, page }) => {
    // Arrange: Navigate to dashboard
    await dashboardPage.navigate();

    // Act: Expand Finances menu and navigate to Stocks
    await dashboardPage.navigateToStocks();

    // Assert: Verify navigation to Stocks page
    await expect(page).toHaveURL(/\/stocks/);
  });

  test('should expand Website menu and navigate to Website Home', async ({ dashboardPage, page }) => {
    // Arrange: Navigate to dashboard
    await dashboardPage.navigate();

    // Act: Expand Website menu and navigate to Website Home
    await dashboardPage.navigateToWebsiteHome();

    // Assert: Verify navigation to Website Home page
    await expect(page).toHaveURL(/\/website\/home/);
  });

  test('should expand Website menu and navigate to Website About', async ({ dashboardPage, page }) => {
    // Arrange: Navigate to dashboard
    await dashboardPage.navigate();

    // Act: Expand Website menu and navigate to Website About
    await dashboardPage.navigateToWebsiteAbout();

    // Assert: Verify navigation to Website About page
    await expect(page).toHaveURL(/\/website\/about/);
  });

  test('should navigate back to Dashboard from sidebar', async ({ dashboardPage, page }) => {
    // Arrange: Navigate to dashboard, then navigate away
    await dashboardPage.navigate();
    await dashboardPage.navigateToUsers();
    await expect(page).toHaveURL(/\/users/);

    // Act: Navigate back to Dashboard via sidebar
    await dashboardPage.openSidebar();
    await dashboardPage.dashboardLink.click();
    await page.waitForURL(/\/dashboard/, { timeout: 10000 });

    // Assert: Verify we're back on the dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(dashboardPage.dashboardHeading).toBeVisible();
  });
});
