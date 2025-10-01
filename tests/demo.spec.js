const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/registrationPage');
const { LoginPage } = require('../pages/loginPage');
const { AccountDashboardPage } = require('../pages/accontDashbordPage'); // Corrected file name
const { generateUserData, logTestStep } = require('../utils/helpers');

/**
 * Demonstration test for ParaBank sign-up and login flow
 * This test demonstrates the complete flow as requested in the assessment
 */
test('ParaBank Assessment Demo: Complete Sign-up and Login Flow', async ({ page }) => {
  // Initialize page objects
  const registrationPage = new RegistrationPage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new AccountDashboardPage(page);
  
  // Generate unique test data
  const userData = generateUserData();
  
  console.log('🎯 PARABANK AUTOMATION ASSESSMENT DEMO');
  console.log('=====================================');
  console.log(`Test User: ${userData.username}`);
  console.log('=====================================');

  try {
    // STEP 1: Navigate to ParaBank and Register New Account
    logTestStep('STEP 1: Navigating to ParaBank registration page');
    await registrationPage.navigateToRegistration();
    
    logTestStep('STEP 2: Filling registration form with test data');
    await registrationPage.fillRegistrationForm(userData);
    
    logTestStep('STEP 3: Submitting registration form');
    await registrationPage.submitRegistration();
    
    logTestStep('STEP 4: Verifying successful registration');
    await registrationPage.verifySuccessfulRegistration();
    
    console.log('✅ REGISTRATION COMPLETED SUCCESSFULLY');
    console.log(`   Username: ${userData.username}`);
    console.log(`   Password: ${userData.password}`);
    
    // STEP 2: Logout and Login with Created Account
    logTestStep('STEP 5: Logging out to test login flow');
    await dashboardPage.logout();
    
    logTestStep('STEP 6: Navigating to login page');
    await loginPage.navigateToLogin();
    
    logTestStep('STEP 7: Logging in with created credentials');
    await loginPage.login(userData.username, userData.password);
    
    logTestStep('STEP 8: Verifying successful login');
    await loginPage.verifySuccessfulLogin();
    
    console.log('✅ LOGIN COMPLETED SUCCESSFULLY');
    
    // STEP 3: Verify Account Dashboard and Extract Balance
    logTestStep('STEP 9: Verifying account dashboard page');
    await dashboardPage.verifyAccountOverviewPage();
    
    logTestStep('STEP 10: Extracting and logging account balance');
    const balanceInfo = await dashboardPage.logAccountBalance();
    
    logTestStep('STEP 11: Verifying balance format and display');
    await dashboardPage.verifyBalanceDisplay();
    
    console.log('✅ BALANCE VERIFICATION COMPLETED');
    console.log('=====================================');
    console.log('🎉 ASSESSMENT DEMO COMPLETED SUCCESSFULLY!');
    console.log('=====================================');
    
    // Final assertions
    expect(balanceInfo.accounts.length).toBeGreaterThan(0);
    console.log(`📊 Total accounts found: ${balanceInfo.accounts.length}`);
    
    balanceInfo.accounts.forEach((account, index) => {
      console.log(`💰 Account ${index + 1} Balance: ${account.balance}`);
      console.log(`💵 Account ${index + 1} Available: ${account.available}`);
    });

  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
    await page.screenshot({ path: `screenshots/error-${Date.now()}.png`, fullPage: true });
    throw error;
  }
});