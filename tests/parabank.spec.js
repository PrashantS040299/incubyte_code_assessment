const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/registrationPage');
const { LoginPage } = require('../pages/loginPage');
const { AccountDashboardPage } = require('../pages/accontDashbordPage');
const { generateUserData, logTestStep, takeScreenshot } = require('../utils/helpers');

test.describe('ParaBank Registration and Login Tests', () => {
  let registrationPage;
  let loginPage;
  let dashboardPage;
  let userData;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new AccountDashboardPage(page);
    userData = generateUserData();
    
    logTestStep('Test setup completed');
  });

  test('Successful user registration and login with balance verification', async ({ page }) => {
    logTestStep('Starting: Successful registration, login and balance verification test');
    
    // Step 1: Navigate to registration page
    await registrationPage.navigateToRegistration();
    await takeScreenshot(page, 'registration-page');
    
    // Step 2: Fill and submit registration form
    await registrationPage.fillRegistrationForm(userData);
    await takeScreenshot(page, 'registration-form-filled');
    
    await registrationPage.submitRegistration();
    await registrationPage.verifySuccessfulRegistration();
    await takeScreenshot(page, 'registration-success');
    
    logTestStep(`Registration completed for user: ${userData.username}`);
    
    // Step 3: Logout and login again to test login flow
    await dashboardPage.logout();
    await takeScreenshot(page, 'after-logout');
    
    // Step 4: Perform login
    await loginPage.navigateToLogin();
    await loginPage.login(userData.username, userData.password);
    await loginPage.verifySuccessfulLogin();
    await takeScreenshot(page, 'login-success');
    
    logTestStep(`Login completed for user: ${userData.username}`);
    
    // Step 5: Verify and log account balance
    await dashboardPage.verifyAccountOverviewPage();
    const balanceInfo = await dashboardPage.logAccountBalance();
    await dashboardPage.verifyBalanceDisplay();
    await takeScreenshot(page, 'account-balance');
    
    logTestStep('Balance verification completed');
    
    // Additional assertions
    expect(balanceInfo.accounts.length).toBeGreaterThan(0);
    console.log('=== TEST COMPLETED SUCCESSFULLY ===');
  });

  test('Registration with duplicate username should fail', async ({ page }) => {
    logTestStep('Starting: Duplicate username registration test');
    
    // First registration
    await registrationPage.navigateToRegistration();
    await registrationPage.fillRegistrationForm(userData);
    await registrationPage.submitRegistration();
    await registrationPage.verifySuccessfulRegistration();
    
    logTestStep(`First user registered: ${userData.username}`);
    
    // Attempt second registration with same username
    await registrationPage.navigateToRegistration();
    await registrationPage.fillRegistrationForm(userData);
    await registrationPage.submitRegistration();
    await registrationPage.verifyUsernameExistsError();
    
    logTestStep('Duplicate username error verified');
  });

  test('Registration with missing required fields should fail', async ({ page }) => {
    logTestStep('Starting: Missing required fields test');
    
    await registrationPage.navigateToRegistration();
    
    // Test with missing firstName
    await registrationPage.fillPartialRegistrationForm(userData, 'firstName');
    await registrationPage.submitRegistration();
    await registrationPage.verifyValidationError('firstName');
    
    logTestStep('Missing firstName validation verified');
  });

  test('Login with invalid credentials should fail', async ({ page }) => {
    logTestStep('Starting: Invalid credentials login test');
    
    await loginPage.navigateToLogin();
    await loginPage.login('invaliduser', 'wrongpassword');
    await loginPage.verifyLoginError();
    
    logTestStep('Invalid credentials error verified');
  });

  test('Account balance should be displayed and properly formatted', async ({ page }) => {
    logTestStep('Starting: Balance display and format test');
    
    // Register and login
    await registrationPage.navigateToRegistration();
    await registrationPage.fillRegistrationForm(userData);
    await registrationPage.submitRegistration();
    await registrationPage.verifySuccessfulRegistration();
    
    // Verify balance
    await dashboardPage.verifyAccountOverviewPage();
    const balanceInfo = await dashboardPage.logAccountBalance();
    const isValidFormat = await dashboardPage.verifyBalanceDisplay();
    
    expect(isValidFormat).toBeTruthy();
    expect(balanceInfo.accounts.length).toBeGreaterThan(0);
    
    logTestStep('Balance format verification completed');
  });
});