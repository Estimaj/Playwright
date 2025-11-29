import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Dashboard Page Object Model for Admin Platform
 * Locators validated using Playwright MCP browser inspection
 */
export class DashboardPage extends BasePage {
  // Main dashboard elements
  readonly dashboardHeading: Locator;
  readonly loggedInMessage: Locator;
  readonly websiteStatusHeading: Locator;
  readonly websiteStatusText: Locator;
  readonly applicationHeading: Locator;
  readonly laravelVersion: Locator;
  readonly phpVersion: Locator;
  readonly yearProgressHeading: Locator;
  readonly yearProgressBar: Locator;

  // Sidebar navigation elements
  readonly menuOpener: Locator;
  readonly sidebar: Locator;
  readonly dashboardLink: Locator;
  readonly usersLink: Locator;
  readonly financesMenu: Locator;
  readonly financesCashFlowLink: Locator;
  readonly financesStocksLink: Locator;
  readonly websiteMenu: Locator;
  readonly websiteHomeLink: Locator;
  readonly websiteAboutLink: Locator;
  readonly websiteExperienceLink: Locator;
  readonly websiteProjectsLink: Locator;
  readonly websiteContactsCheckLink: Locator;
  readonly myBooksLink: Locator;
  readonly importsLink: Locator;

  constructor(page: Page) {
    super(page);

    // Main dashboard content
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard', level: 2 });
    this.loggedInMessage = page.getByText("You're logged in!");
    this.websiteStatusHeading = page.getByRole('heading', { name: 'Website Status', level: 5 });
    this.websiteStatusText = page
      .getByRole('paragraph')
      .filter({ hasText: /^Website is on$/ });
    this.applicationHeading = page.getByRole('heading', { name: 'Application', level: 5 });
    this.laravelVersion = page.getByText(/Laravel Version:/);
    this.phpVersion = page.getByText(/PHP Version:/);
    this.yearProgressHeading = page.getByRole('heading', { name: 'Year Progress', level: 5 });
    this.yearProgressBar = page.getByRole('progressbar');

    // Sidebar navigation - using semantic locators where possible
    this.menuOpener = page.locator('#menu-opener');
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.usersLink = page.getByRole('link', { name: 'Users' });
    this.financesMenu = page.locator('#menu-item-finances');
    this.financesCashFlowLink = page.getByRole('link', { name: 'Cash Flow' });
    this.financesStocksLink = page.getByRole('link', { name: 'Stocks' });
    this.websiteMenu = page.locator('#menu-item-website');
    this.websiteHomeLink = page.getByRole('link', { name: 'Home' });
    this.websiteAboutLink = page.getByRole('link', { name: 'About' });
    this.websiteExperienceLink = page.getByRole('link', { name: 'Experience' });
    this.websiteProjectsLink = page.getByRole('link', { name: 'Projects' });
    this.websiteContactsCheckLink = page.getByRole('link', { name: 'Contacts Check' });
    this.myBooksLink = page.getByRole('link', { name: 'My Books' });
    this.importsLink = page.getByRole('link', { name: 'Imports' });
  }

  /**
   * Navigate to dashboard page
   */
  async navigate(): Promise<void> {
    await this.goto('/dashboard');
  }

  /**
   * Open sidebar menu
   */
  async openSidebar(): Promise<void> {
    // Check if sidebar is already open by checking if menu items are visible
    const isOpen = await this.dashboardLink.isVisible({ timeout: 1000 }).catch(() => false);
    if (!isOpen) {
      await this.menuOpener.click();
      // Wait for sidebar to be visible
      await this.dashboardLink.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  /**
   * Close sidebar menu
   */
  async closeSidebar(): Promise<void> {
    const isOpen = await this.dashboardLink.isVisible({ timeout: 1000 }).catch(() => false);
    if (isOpen) {
      await this.menuOpener.click();
      // Wait for sidebar to be hidden
      await this.dashboardLink.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }
  }

  /**
   * Expand Finances menu section
   */
  async expandFinancesMenu(): Promise<void> {
    await this.openSidebar();
    const isExpanded = await this.financesCashFlowLink.isVisible().catch(() => false);
    if (!isExpanded) {
      await this.financesMenu.click();
      await this.financesCashFlowLink.waitFor({ state: 'visible' });
    }
  }

  /**
   * Expand Website menu section
   */
  async expandWebsiteMenu(): Promise<void> {
    await this.openSidebar();
    const isExpanded = await this.websiteHomeLink.isVisible().catch(() => false);
    if (!isExpanded) {
      await this.websiteMenu.click();
      await this.websiteHomeLink.waitFor({ state: 'visible' });
    }
  }

  /**
   * Navigate to Users page via sidebar
   */
  async navigateToUsers(): Promise<void> {
    await this.openSidebar();
    await this.usersLink.click();
    await this.page.waitForURL(/\/users/, { timeout: 10000 });
  }

  /**
   * Navigate to My Books page via sidebar
   */
  async navigateToMyBooks(): Promise<void> {
    await this.openSidebar();
    await this.myBooksLink.click();
    await this.page.waitForURL(/\/books/, { timeout: 10000 });
  }

  /**
   * Navigate to Imports page via sidebar
   */
  async navigateToImports(): Promise<void> {
    await this.openSidebar();
    await this.importsLink.click();
    await this.page.waitForURL(/\/imports/, { timeout: 10000 });
  }

  /**
   * Navigate to Cash Flow page via sidebar
   */
  async navigateToCashFlow(): Promise<void> {
    await this.expandFinancesMenu();
    await this.financesCashFlowLink.click();
    await this.page.waitForURL(/\/finances/, { timeout: 10000 });
  }

  /**
   * Navigate to Stocks page via sidebar
   */
  async navigateToStocks(): Promise<void> {
    await this.expandFinancesMenu();
    await this.financesStocksLink.click();
    await this.page.waitForURL(/\/stocks/, { timeout: 10000 });
  }

  /**
   * Navigate to Website Home page via sidebar
   */
  async navigateToWebsiteHome(): Promise<void> {
    await this.expandWebsiteMenu();
    await this.websiteHomeLink.click();
    await this.page.waitForURL(/\/website\/home/, { timeout: 10000 });
  }

  /**
   * Navigate to Website About page via sidebar
   */
  async navigateToWebsiteAbout(): Promise<void> {
    await this.expandWebsiteMenu();
    await this.websiteAboutLink.click();
    await this.page.waitForURL(/\/website\/about/, { timeout: 10000 });
  }

  /**
   * Verify dashboard is loaded correctly
   */
  async verifyDashboardLoaded(): Promise<void> {
    await this.dashboardHeading.waitFor({ state: 'visible' });
    await this.loggedInMessage.waitFor({ state: 'visible' });
    await this.websiteStatusHeading.waitFor({ state: 'visible' });
    await this.applicationHeading.waitFor({ state: 'visible' });
    await this.yearProgressHeading.waitFor({ state: 'visible' });
  }

  /**
   * Verify sidebar is accessible
   */
  async verifySidebarAccessible(): Promise<void> {
    await this.openSidebar();
    await this.dashboardLink.waitFor({ state: 'visible' });
    await this.usersLink.waitFor({ state: 'visible' });
  }
}
