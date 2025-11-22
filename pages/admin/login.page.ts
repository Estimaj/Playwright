import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Login Page Object Model for Admin Platform
 * Update selectors and methods based on actual admin login page structure
 */
export class AdminLoginPage extends BasePage {
  // Locators - Update these based on actual admin login page
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators - Update selectors based on actual admin login page
    this.emailInput = page.getByLabel('Email'); // Adjust selector as needed
    this.passwordInput = page.getByLabel('Password'); // Adjust selector as needed
    this.loginButton = page.getByRole('button', { name: 'Login' }); // Adjust selector as needed
    this.errorMessage = page.locator('[role="alert"]'); // Adjust selector as needed
  }

  /**
   * Navigate to admin login page
   */
  async navigate(): Promise<void> {
    await this.goto('/admin/login'); // Update path based on actual admin URL structure
  }

  /**
   * Fill email input
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Fill password input
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Perform login with credentials
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Verify error message is visible
   */
  async verifyErrorMessage(): Promise<void> {
    await this.errorMessage.waitFor({ state: 'visible' });
  }

  /**
   * Verify login page is loaded
   */
  async verifyLoginPageLoaded(): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.loginButton.waitFor({ state: 'visible' });
  }
}

