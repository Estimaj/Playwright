# Playwright Test Suite

A comprehensive Playwright test suite following industry best practices for testing multiple platforms. This project demonstrates proper test organization, Page Object Model (POM) architecture, custom fixtures, and maintainable test patterns.

## Project Structure

```
.
├── tests/                    # Test files organized by platform
│   ├── website-livewire/    # Public website tests
│   └── admin/               # Admin management tests
├── pages/                   # Page Object Models (POM)
│   ├── base.page.ts         # Base page class
│   ├── website-livewire/    # Website-specific page objects
│   └── admin/               # Admin-specific page objects
├── fixtures/                # Custom test fixtures
│   ├── base.fixtures.ts     # Base fixtures with page objects
│   └── auth.fixtures.ts     # Authentication fixtures
├── utils/                   # Utility functions
│   └── helpers.ts           # Common helper functions
├── data/                    # Test data files
├── playwright.config.ts     # Playwright configuration
└── .cursorrules             # Cursor IDE rules for best practices
```

## Platforms

This project tests two platforms:

1. **Website-Livewire** - Public website (`https://joaoestima.com`)
2. **Admin** - Admin management platform

Each platform has its own test directory and can be run independently.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests for Specific Platform

```bash
# Website-Livewire platform
npx playwright test --project=website-livewire-chromium

# Admin platform
npx playwright test --project=admin-chromium
```

### Run Tests in Specific Browser

```bash
# Chromium
npx playwright test --project=website-livewire-chromium

# Firefox
npx playwright test --project=website-livewire-firefox

# WebKit (Safari)
npx playwright test --project=website-livewire-webkit
```

### Run Tests with Tags

```bash
# Run smoke tests only
npx playwright test --grep @smoke

# Run critical tests
npx playwright test --grep @critical

# Run regression tests
npx playwright test --grep @regression
```

### Run Tests in UI Mode

```bash
# Interactive UI mode
npx playwright test --ui

# Run specific test in UI mode
npx playwright test --ui tests/website-livewire/joaoestima.spec.ts
```

### Run Tests in Debug Mode

```bash
# Debug mode with Playwright Inspector
npx playwright test --debug

# Debug specific test
npx playwright test --debug tests/website-livewire/joaoestima.spec.ts
```

### Run Tests in Headed Mode

```bash
# See browser while tests run
npx playwright test --headed
```

## Test Organization

### Directory Structure

Tests are organized by platform:

- `/tests/website-livewire/` - All tests for the public website
- `/tests/admin/` - All tests for the admin platform

### Test File Naming

- Use descriptive names ending with `.spec.ts`
- Examples: `homepage.spec.ts`, `login.spec.ts`, `dashboard.spec.ts`

### Test Structure

Tests follow the AAA pattern (Arrange, Act, Assert):

```typescript
test('user can login', async ({ loginPage }) => {
  // Arrange: Set up test data and state
  await loginPage.navigate();
  
  // Act: Perform the action being tested
  await loginPage.login('user@example.com', 'password123');
  
  // Assert: Verify the expected outcome
  await expect(page).toHaveURL(/dashboard/);
});
```

## Page Object Model (POM)

All page interactions use the Page Object Model pattern for better maintainability.

### Creating a Page Object

1. Create a new file in the appropriate platform directory:
   ```
   pages/website-livewire/new-page.page.ts
   ```

2. Extend `BasePage` and define locators and methods:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class NewPage extends BasePage {
  readonly submitButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }
  
  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }
}
```

3. Add the page object to fixtures (`fixtures/base.fixtures.ts`):

```typescript
newPage: async ({ page }, use) => {
  const newPage = new NewPage(page);
  await use(newPage);
},
```

4. Use in tests:

```typescript
import { test, expect } from '../fixtures/base.fixtures';

test('example', async ({ newPage }) => {
  await newPage.navigate();
  await newPage.clickSubmit();
});
```

## Fixtures

### Base Fixtures

Use base fixtures for page objects:

```typescript
import { test, expect } from '../fixtures/base.fixtures';

test('example', async ({ homepagePage }) => {
  await homepagePage.navigate();
});
```

### Authentication Fixtures

Use authentication fixtures for tests requiring login:

```typescript
import { test, expect } from '../fixtures/auth.fixtures';

test('admin dashboard', async ({ authenticatedAdminPage }) => {
  // Already logged in
  await authenticatedAdminPage.navigate();
});
```

## Tags

Tags help categorize and filter tests:

- `@smoke` - Critical tests that verify basic functionality
- `@regression` - Full regression test suite
- `@critical` - High-priority tests
- `@e2e` - End-to-end tests

### Using Tags

```typescript
test('@smoke @critical user can login', async ({ loginPage }) => {
  // test code
});
```

## Best Practices

### Locator Strategies (Priority Order)

1. **`getByRole()`** - Preferred for accessibility
   ```typescript
   page.getByRole('button', { name: 'Submit' })
   ```

2. **`getByLabel()`** - For form inputs
   ```typescript
   page.getByLabel('Email')
   ```

3. **`getByText()`** - For text content
   ```typescript
   page.getByText('Welcome back')
   ```

4. **`getByPlaceholder()`** - For input placeholders
   ```typescript
   page.getByPlaceholder('Enter your email')
   ```

5. **`getByTestId()`** - For test-specific IDs
   ```typescript
   page.getByTestId('submit-button')
   ```

6. **CSS/XPath** - Use only as last resort

### URLs and Navigation

- **Never hardcode URLs** - Use relative paths with `baseURL` from config
- **Use relative paths** - `/dashboard` instead of `https://example.com/dashboard`

```typescript
// Good ✅
await page.goto('/dashboard');

// Bad ❌
await page.goto('https://joaoestima.com/dashboard');
```

### Waiting Strategies

- **Prefer auto-waiting** - Playwright automatically waits for elements
- **Avoid fixed timeouts** - Never use `page.waitForTimeout()`
- **Use explicit waits** - Only when necessary

```typescript
// Good ✅
await page.getByRole('button').click(); // Auto-waits

// Bad ❌
await page.waitForTimeout(5000);
```

### Assertions

- Use Playwright's `expect()` - Not Jest or other libraries
- Prefer Playwright assertions - They auto-wait

```typescript
await expect(locator).toBeVisible();
await expect(locator).toHaveText('Expected text');
await expect(page).toHaveURL(/dashboard/);
```

## Configuration

### Playwright Config

The `playwright.config.ts` file defines:

- **Projects** - Separate configurations for each platform and browser
- **Base URLs** - Platform-specific base URLs
- **Test Directories** - Where to find tests for each project
- **Reporters** - HTML reporter for test results
- **Retries** - Automatic retries on failure (CI only)

### Environment Variables

You can use environment variables for configuration:

```bash
# .env file
BASE_URL_WEBSITE=https://joaoestima.com
BASE_URL_ADMIN=https://admin.joaoestima.com
```

## Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Reports include:
- Test results and status
- Screenshots on failure
- Trace files for debugging
- Video recordings (if enabled)

## Debugging

### Playwright Inspector

```bash
npx playwright test --debug
```

### Trace Viewer

Traces are automatically collected on test failure. View them:

```bash
npx playwright show-trace test-results/path-to-trace.zip
```

### Screenshots

Screenshots are automatically taken on failure. Find them in:
```
test-results/
```

## CI/CD Integration

This project includes GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

- Runs tests on pull requests
- Installs dependencies and browsers
- Runs all tests
- Uploads test reports as artifacts

## Adding New Tests

1. **Create test file** in appropriate platform directory:
   ```
   tests/website-livewire/new-feature.spec.ts
   ```

2. **Use fixtures** for page objects:
   ```typescript
   import { test, expect } from '../fixtures/base.fixtures';
   ```

3. **Follow AAA pattern** (Arrange, Act, Assert)

4. **Add appropriate tags** (`@smoke`, `@regression`, etc.)

5. **Use Page Objects** - Never use direct selectors

## Utilities

Common utilities are available in `/utils/helpers.ts`:

- `generateRandomEmail()` - Generate test email addresses
- `waitForElementVisible()` - Wait for element with timeout
- `takeScreenshotWithTimestamp()` - Screenshot with timestamp
- `retryWithBackoff()` - Retry function with exponential backoff

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Test Fixtures](https://playwright.dev/docs/test-fixtures)

## Contributing

When adding new tests or modifying existing ones:

1. Follow the patterns established in this project
2. Use Page Object Model for all page interactions
3. Use semantic locators (`getByRole`, `getByLabel`, etc.)
4. Tag tests appropriately
5. Keep tests independent and idempotent
6. Update this README if adding new patterns or conventions

## License

ISC

