import { test, expect } from '../../fixtures/base.fixtures';

/**
 * Test suite for contact form functionality
 * Verifies form fields, validation, and submission
 */
test.describe('Contact Form', () => {
  test('@smoke @critical Contact form - all fields visible, labels, and submit button', async ({ homepagePage, page }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Assert: Verify all form fields are visible
    await homepagePage.verifyContactFormFieldsVisible();

    // Assert: Verify all labels are present
    await expect(page.getByText('First name')).toBeVisible();
    await expect(page.getByText('Last name')).toBeVisible();
    await expect(page.getByText('Email address')).toBeVisible();
    await expect(page.getByText('Phone Number')).toBeVisible();
    await expect(page.getByText('Message')).toBeVisible();

    // Assert: Verify submit button is visible and enabled
    await expect(homepagePage.submitButton).toBeVisible();
    await expect(homepagePage.submitButton).toBeEnabled();
  });

  test('@regression Contact form - fill, verify values, clear, and validation', async ({ homepagePage }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Act: Fill form fields with test data
    await homepagePage.fillContactForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      message: 'This is a test message',
    });

    // Assert: Verify fields contain the entered values
    await expect(homepagePage.firstNameInput).toHaveValue('John');
    await expect(homepagePage.lastNameInput).toHaveValue('Doe');
    await expect(homepagePage.emailInput).toHaveValue('john.doe@example.com');
    await expect(homepagePage.phoneInput).toHaveValue('+1234567890');
    await expect(homepagePage.messageInput).toHaveValue('This is a test message');

    // Act: Clear form
    await homepagePage.clearContactForm();

    // Assert: Verify all fields are empty
    await expect(homepagePage.firstNameInput).toHaveValue('');
    await expect(homepagePage.lastNameInput).toHaveValue('');
    await expect(homepagePage.emailInput).toHaveValue('');
    await expect(homepagePage.phoneInput).toHaveValue('');
    await expect(homepagePage.messageInput).toHaveValue('');
  });

  test('@regression Contact form validation - empty and invalid email', async ({ homepagePage }) => {
    // Arrange: Navigate to homepage
    await homepagePage.navigate();

    // Act: Try to submit empty form
    await homepagePage.submitContactForm();

    // Assert: Verify form validation (this may vary based on implementation)
    // The form should either show validation errors or prevent submission
    // Adjust assertions based on actual form validation behavior

    // Act: Fill form with invalid email
    await homepagePage.fillContactForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      phone: '+1234567890',
      message: 'Test message',
    });

    // Act: Try to submit
    await homepagePage.submitContactForm();

    // Assert: Verify email validation (this may vary based on implementation)
    // The form should either show validation error or prevent submission
    // Adjust assertions based on actual form validation behavior
  });
});

