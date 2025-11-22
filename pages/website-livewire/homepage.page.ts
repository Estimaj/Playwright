import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Homepage Page Object Model for Website-Livewire
 */
export class HomepagePage extends BasePage {
  // Locators
  readonly pimSection: Locator;
  readonly adminPlatformModal: Locator;
  readonly adminPlatformImage: Locator;
  readonly nextButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.pimSection = page.getByText('PIM (Personal Information Manager) This platform is an all-in-one Personal');
    this.adminPlatformModal = page.locator('[role="dialog"]'); // Adjust selector based on actual modal structure
    this.adminPlatformImage = page.getByRole('img', { name: 'Admin Platform - Login' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
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
   */
  async verifyAdminPlatformModalVisible(): Promise<void> {
    await this.adminPlatformImage.waitFor({ state: 'visible' });
  }

  /**
   * Verify admin platform modal is not visible
   */
  async verifyAdminPlatformModalNotVisible(): Promise<void> {
    await this.adminPlatformImage.waitFor({ state: 'hidden' });
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
    await this.verifyAdminPlatformModalVisible();
  }

  /**
   * Close admin platform modal
   */
  async closeAdminPlatformModal(): Promise<void> {
    await this.clickCancel();
    await this.verifyAdminPlatformModalNotVisible();
  }
}

