const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Login form locators
    this.usernameField = page.locator('input[name=\"username\"]');
    this.passwordField = page.locator('input[name=\"password\"]');
    this.loginButton = page.locator('input[value=\"Log In\"]');
    
    // Navigation locators
    this.loginLink = page.locator('a[href=\"index.htm\"]');
    
    // Message locators
    this.errorMessage = page.locator('.error');
    this.welcomeMessage = page.locator('h1.title');
  }

  /**
   * Navigate to the login page
   */
  async navigateToLogin() {
    await this.page.goto('/index.htm');
    await expect(this.page).toHaveURL(/.*index.htm/);
  }

  /**
   * Perform login with provided credentials
   * @param {string} username - Username for login
   * @param {string} password - Password for login
   */
  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  /**
   * Verify successful login
   */
  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/.*overview.htm/);
    await expect(this.welcomeMessage).toContainText('Accounts Overview');
  }

  /**
   * Verify login error message
   * @param {string} expectedMessage - Expected error message
   */
  async verifyLoginError(expectedMessage = 'The username and password could not be verified') {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /**
   * Check if user is logged in by looking for logout link
   */
  async isUserLoggedIn() {
    const logoutLink = this.page.locator('a[href=\"logout.htm\"]');
    return await logoutLink.isVisible();
  }

  /**
   * Logout the current user
   */
  async logout() {
    const logoutLink = this.page.locator('a[href=\"logout.htm\"]');
    if (await logoutLink.isVisible()) {
      await logoutLink.click();
    }
  }
}

module.exports = { LoginPage };