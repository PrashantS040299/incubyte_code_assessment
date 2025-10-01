const { expect } = require('@playwright/test');

class RegistrationPage {
  constructor(page) {
    this.page = page;
    
    // Form field locators
    this.firstNameField = page.locator('input[name=\"customer.firstName\"]');
    this.lastNameField = page.locator('input[name=\"customer.lastName\"]');
    this.addressField = page.locator('input[name=\"customer.address.street\"]');
    this.cityField = page.locator('input[name=\"customer.address.city\"]');
    this.stateField = page.locator('input[name=\"customer.address.state\"]');
    this.zipCodeField = page.locator('input[name=\"customer.address.zipCode\"]');
    this.phoneField = page.locator('input[name=\"customer.phoneNumber\"]');
    this.ssnField = page.locator('input[name=\"customer.ssn\"]');
    this.usernameField = page.locator('input[name=\"customer.username\"]');
    this.passwordField = page.locator('input[name=\"customer.password\"]');
    this.confirmPasswordField = page.locator('input[name=\"repeatedPassword\"]');
    
    // Button and link locators
    this.registerButton = page.locator('input[value=\"Register\"]');
    this.registerLink = page.locator('a[href=\"register.htm\"]');
    
    // Message locators
    this.successMessage = page.locator('.title');
    this.errorMessage = page.locator('.error');
    this.validationErrors = page.locator('span.error');
  }

  /**
   * Navigate to the registration page
   */
  async navigateToRegistration() {
    await this.page.goto('/index.htm');
    await this.registerLink.click();
    await expect(this.page).toHaveURL(/.*register.htm/);
  }

  /**
   * Fill out the registration form with provided user data
   * @param {Object} userData - User registration data
   */
  async fillRegistrationForm(userData) {
    await this.firstNameField.fill(userData.firstName);
    await this.lastNameField.fill(userData.lastName);
    await this.addressField.fill(userData.address);
    await this.cityField.fill(userData.city);
    await this.stateField.fill(userData.state);
    await this.zipCodeField.fill(userData.zipCode);
    await this.phoneField.fill(userData.phone);
    await this.ssnField.fill(userData.ssn);
    await this.usernameField.fill(userData.username);
    await this.passwordField.fill(userData.password);
    await this.confirmPasswordField.fill(userData.password);
  }

  /**
   * Fill partial registration form (used for negative testing)
   * @param {Object} userData - Partial user data
   * @param {string} excludeField - Field to exclude from filling
   */
  async fillPartialRegistrationForm(userData, excludeField = null) {
    const fieldMap = {
      firstName: this.firstNameField,
      lastName: this.lastNameField,
      address: this.addressField,
      city: this.cityField,
      state: this.stateField,
      zipCode: this.zipCodeField,
      phone: this.phoneField,
      ssn: this.ssnField,
      username: this.usernameField,
      password: this.passwordField
    };

    for (const [field, locator] of Object.entries(fieldMap)) {
      if (field !== excludeField && userData[field]) {
        await locator.fill(userData[field]);
      }
    }

    if (excludeField !== 'password' && userData.password) {
      await this.confirmPasswordField.fill(userData.password);
    }
  }

  /**
   * Submit the registration form
   */
  async submitRegistration() {
    await this.registerButton.click();
  }

  /**
   * Verify successful registration
   */
  async verifySuccessfulRegistration() {
    await expect(this.successMessage).toContainText('Your account was created successfully');
    await expect(this.page).toHaveURL(/.*overview.htm/);
  }

  /**
   * Verify registration error message
   * @param {string} expectedMessage - Expected error message
   */
  async verifyRegistrationError(expectedMessage) {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /**
   * Verify validation error for specific field
   * @param {string} fieldName - Name of the field with validation error
   */
  async verifyValidationError(fieldName) {
    const errorText = await this.validationErrors.allTextContents();
    const hasFieldError = errorText.some(text => 
      text.toLowerCase().includes(fieldName.toLowerCase()) || 
      text.includes('is required')
    );
    expect(hasFieldError).toBeTruthy();
  }

  /**
   * Check if username already exists error is displayed
   */
  async verifyUsernameExistsError() {
    await expect(this.errorMessage).toContainText('This username already exists');
  }
}

module.exports = { RegistrationPage };