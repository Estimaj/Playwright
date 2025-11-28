import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Homepage Page Object Model for Website-Livewire
 */
export class HomepagePage extends BasePage {
  // Modal Locators
  readonly pimSection: Locator;
  readonly adminPlatformModal: Locator;
  readonly adminPlatformImage: Locator;
  readonly adminPlatformAnyImage: Locator;
  readonly nextButton: Locator;
  readonly cancelButton: Locator;

  // Page Structure Locators
  readonly profileImage: Locator;
  readonly howAmISection: Locator;
  readonly certifiedDeveloperSection: Locator;
  readonly professionalExperienceSection: Locator;
  readonly teamLeadSection: Locator;
  readonly apiDevelopmentSection: Locator;
  readonly trustedToolsSection: Locator;
  readonly projectsSection: Locator;
  readonly contactFormSection: Locator;
  readonly cvSection: Locator;
  readonly footerSection: Locator;

  // Cookie Banner Locators
  readonly cookieBanner: Locator;
  readonly cookieAcceptButton: Locator;
  readonly cookiePrivacyLink: Locator;

  // Tool Icons Locators
  readonly phpIcon: Locator;
  readonly javascriptIcon: Locator;
  readonly laravelIcon: Locator;
  readonly vueIcon: Locator;
  readonly livewireIcon: Locator;
  readonly jqueryIcon: Locator;
  readonly dockerIcon: Locator;
  readonly awsIcon: Locator;
  readonly pythonIcon: Locator;
  readonly mysqlIcon: Locator;

  // Contact Form Locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;

  // Footer Links Locators
  readonly termsOfServiceLink: Locator;
  readonly privacyPolicyLink: Locator;

  // Social Media Links Locators
  readonly linkedInLink: Locator;
  readonly githubLink: Locator;

  // External Project Links Locators
  readonly raizarteLink: Locator;
  readonly oldWebsiteLink: Locator;

  // CV Download Locators
  readonly cvDownloadCount: Locator;
  readonly cvDownloadButton: Locator;

  // Content Verification Locators
  readonly contactEmail: Locator;
  readonly basedInLocation: Locator;
  readonly copyrightNotice: Locator;
  readonly footerLogo: Locator;

  constructor(page: Page) {
    super(page);
    
    // Modal Locators
    this.pimSection = page.getByText('PIM (Personal Information Manager) This platform is an all-in-one Personal');
    this.adminPlatformModal = page.locator('[role="dialog"]');
    this.adminPlatformImage = page.getByRole('img', { name: 'Admin Platform - Login' });
    this.adminPlatformAnyImage = page.getByRole('img', { name: /Admin Platform/i }).first();
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });

    // Page Structure Locators
    this.profileImage = page.getByRole('img', { name: 'profile-img' });
    this.howAmISection = page.getByRole('heading', { name: 'How am I' });
    this.certifiedDeveloperSection = page.getByText('Certified Software Developer');
    this.professionalExperienceSection = page.getByText('Professional Experience');
    this.teamLeadSection = page.getByText('Team Lead');
    this.apiDevelopmentSection = page.getByText('API Development').first();
    this.trustedToolsSection = page.getByRole('heading', { name: 'Trusted tools I use frequently.' });
    this.projectsSection = page.getByText('Projects', { exact: true }).first();
    this.contactFormSection = page.getByRole('heading', { name: 'Contact Form' });
    this.cvSection = page.getByRole('heading', { name: 'CV' });
    this.footerSection = page.getByText('© 2025 - All rights reserved.');

    // Cookie Banner Locators
    this.cookieBanner = page.getByText('We use cookies to improve your experience.');
    this.cookieAcceptButton = page.getByRole('button', { name: 'Accept' });
    this.cookiePrivacyLink = page.getByRole('link', { name: 'Privacy Policy' }).filter({ hasText: 'Privacy Policy' }).first();

    // Tool Icons Locators
    this.phpIcon = page.getByRole('img', { name: 'PHP' });
    this.javascriptIcon = page.getByRole('img', { name: 'JavaScript' });
    this.laravelIcon = page.getByRole('img', { name: 'Laravel' });
    this.vueIcon = page.getByRole('img', { name: 'Vue.js' });
    this.livewireIcon = page.getByRole('img', { name: 'Livewire' });
    this.jqueryIcon = page.getByRole('img', { name: 'jQuery' });
    this.dockerIcon = page.getByRole('img', { name: 'Docker' });
    this.awsIcon = page.getByRole('img', { name: 'AWS' });
    this.pythonIcon = page.getByRole('img', { name: 'Python' });
    this.mysqlIcon = page.getByRole('img', { name: 'MySQL' });

    // Contact Form Locators
    this.firstNameInput = page.getByLabel('First name');
    this.lastNameInput = page.getByLabel('Last name');
    this.emailInput = page.getByLabel('Email address');
    this.phoneInput = page.getByLabel('Phone Number');
    this.messageInput = page.getByLabel('Message');
    this.submitButton = page.getByRole('button', { name: 'Submit' });

    // Footer Links Locators
    this.termsOfServiceLink = page.getByRole('link', { name: 'Terms of Service' });
    this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' }).last();

    // Social Media Links Locators - use URL-based locators since links don't have text content
    this.linkedInLink = page.locator('a[href*="linkedin.com"]');
    this.githubLink = page.locator('a[href*="github.com"]');

    // External Project Links Locators
    this.raizarteLink = page.getByRole('link', { name: /Raizarte/i });
    this.oldWebsiteLink = page.getByRole('link', { name: 'Old Website' });

    // CV Download Locators
    this.cvDownloadCount = page.getByText(/Download count:/);
    this.cvDownloadButton = page.getByText('Download CV');

    // Content Verification Locators
    this.contactEmail = page.getByText('contact@joaoestima.com');
    this.basedInLocation = page.getByText('Aveiro, Portugal.');
    this.copyrightNotice = page.getByText('© 2025 - All rights reserved.');
    this.footerLogo = page.getByRole('img', { name: 'Logo' });
  }

  /**
   * Navigate to homepage
   */
  async navigate(): Promise<void> {
    await this.goto('/');
  }

  /**
   * Click on PIM section to open admin platform modal
   */
  async clickPimSection(): Promise<void> {
    await this.pimSection.click();
  }

  /**
   * Verify admin platform modal is visible
   * Checks for any Admin Platform image (not just the Login one)
   * This ensures it works even after navigating through multiple images in the carousel
   */
  async verifyAdminPlatformModalVisible(): Promise<void> {
    // Check for any Admin Platform image - this works regardless of which image is currently displayed
    // The image is the most reliable indicator that the modal is open and visible
    await this.adminPlatformAnyImage.waitFor({ state: 'visible' });
  }

  /**
   * Verify admin platform modal is not visible
   * Checks for the modal dialog to be hidden, which works regardless of which image was last displayed
   */
  async verifyAdminPlatformModalNotVisible(): Promise<void> {
    await this.adminPlatformModal.waitFor({ state: 'hidden' });
  }

  /**
   * Click Next button
   */
  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  /**
   * Click Next button multiple times
   */
  async clickNextMultiple(times: number): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.clickNext();
      // Wait for modal image to update - wait for Admin Platform image to be visible and stable
      // This ensures the transition has completed before clicking Next again
      // Playwright's auto-waiting ensures the image is attached and stable
      await this.adminPlatformAnyImage.waitFor({ state: 'visible' });
    }
  }

  /**
   * Click Cancel button to close modal
   */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Open admin platform modal and navigate through it
   */
  async openAdminPlatformModal(steps: number = 5): Promise<void> {
    await this.clickPimSection();
    await this.verifyAdminPlatformModalVisible();
    await this.clickNextMultiple(steps);
    // After clicking Next, the image changes, so verify modal is still open by checking any image in modal
    // Wait for any Admin Platform image to be visible (not just the Login one)
    await this.adminPlatformAnyImage.waitFor({ state: 'visible' });
  }

  /**
   * Close admin platform modal
   */
  async closeAdminPlatformModal(): Promise<void> {
    await this.clickCancel();
    await this.verifyAdminPlatformModalNotVisible();
  }

  // Cookie Banner Methods
  /**
   * Verify cookie banner is visible
   */
  async verifyCookieBannerVisible(): Promise<void> {
    await this.cookieBanner.waitFor({ state: 'visible' });
  }

  /**
   * Verify cookie banner is not visible
   */
  async verifyCookieBannerNotVisible(): Promise<void> {
    // Check if banner exists - if it doesn't exist, that's fine (cookies already accepted)
    // If it exists, wait for it to be hidden
    const count = await this.cookieBanner.count();
    if (count > 0) {
      await this.cookieBanner.waitFor({ state: 'hidden' });
    }
    // If count is 0, banner doesn't exist which is the expected state
  }

  /**
   * Accept cookies by clicking Accept button
   */
  async acceptCookies(): Promise<void> {
    await this.cookieAcceptButton.click();
  }

  /**
   * Click on Privacy Policy link in cookie banner
   */
  async clickCookiePrivacyLink(): Promise<void> {
    await this.cookiePrivacyLink.click();
  }

  // Tool Icons Methods
  /**
   * Click on a tool icon by name
   */
  async clickToolIcon(toolName: string): Promise<void> {
    const toolIcon = this.page.getByRole('img', { name: toolName });
    await toolIcon.click();
  }

  /**
   * Verify tool icon displays additional information after click
   */
  async verifyToolInfoDisplayed(toolName: string): Promise<void> {
    // After clicking, additional info like "4+ Years" should appear
    // Wait for the experience text pattern to appear (e.g., "4+ Years", "5+ Years")
    const experienceText = this.page.locator('text=/\\d+\\+?\\s*Years?/i');
    await experienceText.first().waitFor({ state: 'visible' });
  }

  /**
   * Click multiple tool icons in sequence
   */
  async clickMultipleToolIcons(toolNames: string[]): Promise<void> {
    for (const toolName of toolNames) {
      await this.clickToolIcon(toolName);
      await this.verifyToolInfoDisplayed(toolName);
    }
  }

  // Contact Form Methods
  /**
   * Fill contact form with provided data
   */
  async fillContactForm(data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    message?: string;
  }): Promise<void> {
    if (data.firstName) {
      await this.firstNameInput.fill(data.firstName);
    }
    if (data.lastName) {
      await this.lastNameInput.fill(data.lastName);
    }
    if (data.email) {
      await this.emailInput.fill(data.email);
    }
    if (data.phone) {
      await this.phoneInput.fill(data.phone);
    }
    if (data.message) {
      await this.messageInput.fill(data.message);
    }
  }

  /**
   * Submit contact form
   */
  async submitContactForm(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Verify all contact form fields are visible
   */
  async verifyContactFormFieldsVisible(): Promise<void> {
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.lastNameInput.waitFor({ state: 'visible' });
    await this.emailInput.waitFor({ state: 'visible' });
    await this.phoneInput.waitFor({ state: 'visible' });
    await this.messageInput.waitFor({ state: 'visible' });
    await this.submitButton.waitFor({ state: 'visible' });
  }

  /**
   * Clear all contact form fields
   */
  async clearContactForm(): Promise<void> {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.emailInput.clear();
    await this.phoneInput.clear();
    await this.messageInput.clear();
  }

  // Navigation Links Methods
  /**
   * Click Terms of Service link
   */
  async clickTermsOfServiceLink(): Promise<void> {
    await this.termsOfServiceLink.click();
  }

  /**
   * Click Privacy Policy link in footer
   */
  async clickPrivacyPolicyLink(): Promise<void> {
    await this.privacyPolicyLink.click();
  }

  /**
   * Click LinkedIn link
   */
  async clickLinkedInLink(): Promise<void> {
    await this.linkedInLink.click();
  }

  /**
   * Click GitHub link
   */
  async clickGitHubLink(): Promise<void> {
    await this.githubLink.click();
  }

  /**
   * Click Raizarte project link
   */
  async clickRaizarteLink(): Promise<void> {
    await this.raizarteLink.click();
  }

  /**
   * Click Old Website link
   */
  async clickOldWebsiteLink(): Promise<void> {
    await this.oldWebsiteLink.click();
  }

  // CV Download Methods
  /**
   * Verify CV download count is visible
   */
  async verifyCvDownloadCountVisible(): Promise<void> {
    await this.cvDownloadCount.waitFor({ state: 'visible' });
  }

  /**
   * Get CV download count text
   */
  async getCvDownloadCount(): Promise<string> {
    return await this.cvDownloadCount.textContent() || '';
  }

  /**
   * Click Download CV button
   */
  async clickDownloadCv(): Promise<void> {
    await this.cvDownloadButton.click();
  }

  // Content Verification Methods
  /**
   * Verify profile image is visible
   */
  async verifyProfileImageVisible(): Promise<void> {
    await this.profileImage.waitFor({ state: 'visible' });
  }

  /**
   * Verify contact information is displayed correctly
   */
  async verifyContactInfoDisplayed(): Promise<void> {
    await this.contactEmail.waitFor({ state: 'visible' });
    await this.basedInLocation.waitFor({ state: 'visible' });
  }

  /**
   * Verify copyright notice is displayed
   */
  async verifyCopyrightNoticeDisplayed(): Promise<void> {
    await this.copyrightNotice.waitFor({ state: 'visible' });
  }

  /**
   * Verify footer logo is visible
   */
  async verifyFooterLogoVisible(): Promise<void> {
    await this.footerLogo.waitFor({ state: 'visible' });
  }

  /**
   * Verify all major sections are visible
   */
  async verifyAllSectionsVisible(): Promise<void> {
    await this.profileImage.waitFor({ state: 'visible' });
    await this.howAmISection.waitFor({ state: 'visible' });
    await this.certifiedDeveloperSection.waitFor({ state: 'visible' });
    await this.professionalExperienceSection.waitFor({ state: 'visible' });
    await this.teamLeadSection.waitFor({ state: 'visible' });
    await this.apiDevelopmentSection.waitFor({ state: 'visible' });
    await this.trustedToolsSection.waitFor({ state: 'visible' });
    await this.projectsSection.waitFor({ state: 'visible' });
    await this.contactFormSection.waitFor({ state: 'visible' });
    await this.cvSection.waitFor({ state: 'visible' });
    await this.footerSection.waitFor({ state: 'visible' });
  }
}

