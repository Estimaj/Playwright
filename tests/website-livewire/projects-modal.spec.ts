import { test, expect } from '../../fixtures/base.fixtures';

/**
 * Test suite for Projects Modal (PIM) functionality
 * Verifies modal opens, navigation through images, and closing functionality
 */
test.describe('Projects Modal - PIM', () => {
  test('@smoke @critical PIM modal - open, display first image, and verify buttons', async ({ homepagePage }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Act: Click on PIM section
    await homepagePage.clickPimSection();

    // Assert: Verify modal is visible and displays first image
    await homepagePage.verifyAdminPlatformModalVisible();
    await expect(homepagePage.adminPlatformImage).toBeVisible();
    await expect(homepagePage.adminPlatformImage).toHaveAttribute('alt', /Admin Platform - Login/i);

    // Assert: Verify buttons are visible and enabled
    await expect(homepagePage.nextButton).toBeVisible();
    await expect(homepagePage.cancelButton).toBeVisible();
    await expect(homepagePage.nextButton).toBeEnabled();
    await expect(homepagePage.cancelButton).toBeEnabled();
  });

  test('@regression Modal navigation - Next button and Cancel functionality', async ({ homepagePage, page }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Act: Open modal
    await homepagePage.clickPimSection();
    await homepagePage.verifyAdminPlatformModalVisible();

    // Act: Click Next button
    await homepagePage.clickNext();

    // Assert: Verify image changes (e.g., to "Admin Platform - Dashboard")
    const dashboardImage = page.getByRole('img', { name: /Admin Platform - Dashboard/i });
    await expect(dashboardImage).toBeVisible();

    // Act: Click Cancel button
    await homepagePage.clickCancel();

    // Assert: Verify modal is closed
    await homepagePage.verifyAdminPlatformModalNotVisible();
  });

  test('@regression Modal can navigate through multiple images before closing', async ({ homepagePage }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Act: Open modal and navigate through multiple images
    await homepagePage.openAdminPlatformModal(5);

    // Assert: Verify modal is still visible after navigation
    await homepagePage.verifyAdminPlatformModalVisible();

    // Act: Close modal
    await homepagePage.closeAdminPlatformModal();

    // Assert: Verify modal is closed
    await homepagePage.verifyAdminPlatformModalNotVisible();
  });
});

