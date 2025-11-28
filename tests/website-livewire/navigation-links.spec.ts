import { test, expect } from '../../fixtures/base.fixtures';

/**
 * Test suite for navigation links functionality
 * Verifies footer links, social media links, and external project links
 */
test.describe('Navigation Links', () => {
  test('@smoke Footer links - Terms of Service and Privacy Policy', async ({ homepagePage, page }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Act: Click Terms of Service link
    await homepagePage.clickTermsOfServiceLink();

    // Assert: Verify navigation to terms of service page
    await expect(page).toHaveURL(/terms-of-service/);
    await expect(page.getByRole('heading', { name: 'Terms of Service' })).toBeVisible();

    // Act: Navigate back and click Privacy Policy link
    await homepagePage.navigate();
    await homepagePage.clickPrivacyPolicyLink();

    // Assert: Verify navigation to privacy policy page
    await expect(page).toHaveURL(/privacy-policy/);
  });

  test('@regression Social media links - visibility and navigation', async ({ homepagePage, page, context }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Assert: Verify social links are visible
    await expect(homepagePage.linkedInLink).toBeVisible();
    await expect(homepagePage.githubLink).toBeVisible();

    // Act & Assert: Click LinkedIn link
    const [linkedInPage] = await Promise.all([
      context.waitForEvent('page'),
      homepagePage.clickLinkedInLink(),
    ]);
    expect(linkedInPage.url()).toContain('linkedin.com');
    await linkedInPage.close();

    // Act & Assert: Click GitHub link
    const [githubPage] = await Promise.all([
      context.waitForEvent('page'),
      homepagePage.clickGitHubLink(),
    ]);
    expect(githubPage.url()).toContain('github.com');
    await githubPage.close();
  });

  test('@regression External project links - visibility and navigation', async ({ homepagePage, page, context }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Assert: Verify links are visible
    await expect(homepagePage.raizarteLink).toBeVisible();
    await expect(homepagePage.oldWebsiteLink).toBeVisible();

    // Act & Assert: Click Raizarte link
    const [raizartePage] = await Promise.all([
      context.waitForEvent('page'),
      homepagePage.clickRaizarteLink(),
    ]);
    expect(raizartePage.url()).toContain('raizarte.com');
    await raizartePage.close();

    // Act & Assert: Click Old Website link
    const [oldWebsitePage] = await Promise.all([
      context.waitForEvent('page'),
      homepagePage.clickOldWebsiteLink(),
    ]);
    expect(oldWebsitePage.url()).toContain('old.joaoestima.com');
    await oldWebsitePage.close();
  });
});

