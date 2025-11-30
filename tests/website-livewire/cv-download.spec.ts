import { test, expect } from '../../fixtures/website-livewire.fixtures';

/**
 * Test suite for CV download functionality
 * Verifies CV section displays download count and download functionality
 */
test.describe('CV Download', () => {
  test('@regression CV section - all validations and download functionality', async ({ homepagePage, page, context }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Assert: Verify CV section is visible
    await expect(homepagePage.cvSection).toBeVisible();

    // Assert: Verify download count is visible and contains expected text pattern
    await homepagePage.verifyCvDownloadCountVisible();
    const downloadCount = await homepagePage.getCvDownloadCount();
    expect(downloadCount).toMatch(/Download count:/i);

    // Assert: Verify download button is visible and enabled
    await expect(homepagePage.cvDownloadButton).toBeVisible();
    await expect(homepagePage.cvDownloadButton).toBeEnabled();

    // Act & Assert: Test download functionality
    const downloadPromise = page.waitForEvent('download');
    await homepagePage.clickDownloadCv();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.(pdf|doc|docx)$/i);
  });
});

