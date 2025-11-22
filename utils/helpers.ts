import { Page, Locator } from '@playwright/test';

/**
 * Utility functions for Playwright tests
 * Common helper methods that can be reused across tests
 */

/**
 * Wait for a specific amount of time
 * Use sparingly - prefer waiting for elements/conditions instead
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random email address for testing
 */
export function generateRandomEmail(domain: string = 'test.com'): string {
  const randomString = Math.random().toString(36).substring(2, 11);
  return `test-${randomString}@${domain}`;
}

/**
 * Generate random string
 */
export function generateRandomString(length: number = 10): string {
  return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Wait for element to be visible with custom timeout
 */
export async function waitForElementVisible(
  locator: Locator,
  timeout: number = 5000
): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
}

/**
 * Wait for element to be hidden
 */
export async function waitForElementHidden(
  locator: Locator,
  timeout: number = 5000
): Promise<void> {
  await locator.waitFor({ state: 'hidden', timeout });
}

/**
 * Scroll element into view
 */
export async function scrollIntoView(locator: Locator): Promise<void> {
  await locator.scrollIntoViewIfNeeded();
}

/**
 * Take screenshot with timestamp
 */
export async function takeScreenshotWithTimestamp(
  page: Page,
  name: string
): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `test-results/screenshots/${name}-${timestamp}.png`,
    fullPage: true,
  });
}

/**
 * Check if element exists (doesn't throw if not found)
 */
export async function elementExists(locator: Locator): Promise<boolean> {
  try {
    await locator.waitFor({ state: 'attached', timeout: 1000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get text content safely (returns empty string if element not found)
 */
export async function getTextSafely(locator: Locator): Promise<string> {
  try {
    return await locator.textContent() || '';
  } catch {
    return '';
  }
}

/**
 * Wait for network to be idle
 */
export async function waitForNetworkIdle(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        await wait(delay);
      }
    }
  }
  
  throw lastError || new Error('Retry failed');
}

