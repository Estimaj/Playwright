import { test, expect } from '../../fixtures/base.fixtures';

/**
 * Test suite for tool icons interaction
 * Verifies tool icons are clickable and display additional information
 */
test.describe('Tool Icons', () => {
  test('@smoke @regression All tool icons are visible and clickable', async ({ homepagePage, page }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Act & Assert: Verify all 10 tool icons are visible and clickable
    const toolIcons = [
      { name: 'PHP', locator: homepagePage.phpIcon },
      { name: 'JavaScript', locator: homepagePage.javascriptIcon },
      { name: 'Laravel', locator: homepagePage.laravelIcon },
      { name: 'Vue.js', locator: homepagePage.vueIcon },
      { name: 'Livewire', locator: homepagePage.livewireIcon },
      { name: 'jQuery', locator: homepagePage.jqueryIcon },
      { name: 'Docker', locator: homepagePage.dockerIcon },
      { name: 'AWS', locator: homepagePage.awsIcon },
      { name: 'Python', locator: homepagePage.pythonIcon },
      { name: 'MySQL', locator: homepagePage.mysqlIcon },
    ];

    for (const tool of toolIcons) {
      await expect(tool.locator).toBeVisible();
      await tool.locator.click();
      // Wait for the experience text to appear after clicking
      const experienceText = page.locator('text=/\\d+\\+?\\s*Years?/i');
      await expect(experienceText.first()).toBeVisible({ timeout: 2000 });
    }
  });

  test('@regression Clicking tool icon displays additional information', async ({ homepagePage, page }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Act: Click PHP icon
    await homepagePage.clickToolIcon('PHP');

    // Assert: Verify additional information appears (e.g., "4+ Years")
    // Wait for the experience text pattern to appear
    const toolInfo = page.locator('text=/\\d+\\+?\\s*Years?/i');
    await expect(toolInfo.first()).toBeVisible({ timeout: 2000 });
  });
});

