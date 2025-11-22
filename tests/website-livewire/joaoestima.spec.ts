import { test, expect } from '../../fixtures/base.fixtures';

/**
 * Test suite for Website-Livewire homepage functionality
 * Uses Page Object Model pattern for better maintainability
 */
test.describe('Homepage - Admin Platform Modal', () => {
  test('@smoke It Opens Admin Platform Modal', async ({ homepagePage }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Act: Open admin platform modal and navigate through it
    await homepagePage.openAdminPlatformModal(5);

    // Assert: Verify modal is visible after navigation
    await homepagePage.verifyAdminPlatformModalVisible();

    // Act: Close the modal
    await homepagePage.closeAdminPlatformModal();

    // Assert: Verify modal is closed
    await homepagePage.verifyAdminPlatformModalNotVisible();
  });
});

