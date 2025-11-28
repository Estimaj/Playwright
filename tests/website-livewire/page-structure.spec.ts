import { test, expect } from '../../fixtures/base.fixtures';

/**
 * Test suite for page load and structure verification
 * Ensures all major sections render correctly on the homepage
 */
test.describe('Page Structure', () => {
  test('@smoke @critical Homepage loads with correct title and all major sections', async ({ homepagePage }) => {
    // Arrange & Act: Navigate to homepage
    await homepagePage.navigate();

    // Assert: Verify page title
    const title = await homepagePage.getTitle();
    expect(title).toBe('João Estima - Software Engineer');

    // Assert: Verify all major sections are visible
    await homepagePage.verifyAllSectionsVisible();
    await homepagePage.verifyProfileImageVisible();
    await expect(homepagePage.projectsSection).toBeVisible();
    await expect(homepagePage.contactFormSection).toBeVisible();
    await expect(homepagePage.cvSection).toBeVisible();
    await expect(homepagePage.footerSection).toBeVisible();
  });

  test('@regression "How am I" section displays all key points', async ({ homepagePage }) => {
    // Arrange & Act: Navigate to homepage
    await homepagePage.navigate();

    // Assert: Verify all 4 key points are visible
    await expect(homepagePage.certifiedDeveloperSection).toBeVisible();
    await expect(homepagePage.professionalExperienceSection).toBeVisible();
    await expect(homepagePage.teamLeadSection).toBeVisible();
    await expect(homepagePage.apiDevelopmentSection).toBeVisible();
  });

  test('@regression Trusted tools section displays all 10 tool icons', async ({ homepagePage }) => {
    // Arrange & Act: Navigate to homepage
    await homepagePage.navigate();

    // Assert: Verify trusted tools section is visible
    await expect(homepagePage.trustedToolsSection).toBeVisible();

    // Assert: Verify all 10 tool icons are visible
    await expect(homepagePage.phpIcon).toBeVisible();
    await expect(homepagePage.javascriptIcon).toBeVisible();
    await expect(homepagePage.laravelIcon).toBeVisible();
    await expect(homepagePage.vueIcon).toBeVisible();
    await expect(homepagePage.livewireIcon).toBeVisible();
    await expect(homepagePage.jqueryIcon).toBeVisible();
    await expect(homepagePage.dockerIcon).toBeVisible();
    await expect(homepagePage.awsIcon).toBeVisible();
    await expect(homepagePage.pythonIcon).toBeVisible();
    await expect(homepagePage.mysqlIcon).toBeVisible();
  });

  test('@regression Footer content - all elements display correctly', async ({ homepagePage }) => {
    // Arrange & Act: Navigate to homepage
    await homepagePage.navigate();

    // Assert: Verify contact information
    await homepagePage.verifyContactInfoDisplayed();
    await expect(homepagePage.contactEmail).toContainText('contact@joaoestima.com');
    await expect(homepagePage.basedInLocation).toContainText('Aveiro, Portugal.');

    // Assert: Verify copyright notice
    await homepagePage.verifyCopyrightNoticeDisplayed();
    await expect(homepagePage.copyrightNotice).toContainText('© 2025 - All rights reserved.');

    // Assert: Verify footer logo
    await homepagePage.verifyFooterLogoVisible();
  });
});

