import { test as base } from '@playwright/test';
import { HomepagePage } from '../pages/website-livewire/homepage.page';

/**
 * Website-Livewire fixtures extend Playwright's test object
 * Provides homepage page object to website test suites
 */
type WebsiteLivewireFixtures = {
  homepagePage: HomepagePage;
};

/**
 * Extended test object with Website-Livewire fixtures
 * Use this instead of the default test when working with website-livewire pages
 */
export const test = base.extend<WebsiteLivewireFixtures>({
  /**
   * Homepage page object fixture for Website-Livewire
   */
  homepagePage: async ({ page }, use) => {
    const homepagePage = new HomepagePage(page);
    await use(homepagePage);
  },
});

export { expect } from '@playwright/test';


