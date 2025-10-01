const { Given, When, Then } = require('@cucumber/cucumber');
const { RegistrationPage } = require('../../pages/registrationPage');
const { LoginPage } = require('../../pages/loginPage');
const { AccountDashboardPage } = require('../../../pages/accountDashboardPage');
const { generateUserData, generateUserDataWithUsername, logTestStep } = require('../../utils/helpers');

let registrationPage;
let loginPage;
let dashboardPage;
let currentUserData;

// Background step
Given('I navigate to the ParaBank website', async function () {
  logTestStep('Navigating to ParaBank website');
  registrationPage = new RegistrationPage(this.page);
  loginPage = new LoginPage(this.page);
  dashboardPage = new AccountDashboardPage(this.page);
  await this.page.goto('/index.htm');
});

// Registration steps
When('I click on the Register link', async function () {
  logTestStep('Clicking on Register link');
  await registrationPage.navigateToRegistration();
});

When('I fill out the registration form with valid details:', async function (dataTable) {
  logTestStep('Filling registration form with valid details');
  const userData = dataTable.hashes()[0];
  currentUserData = userData;
  await registrationPage.fillRegistrationForm(userData);
});

When('I fill out the registration form with username {string}', async function (username) {
  logTestStep(`Filling registration form with username: ${username}`);
  currentUserData = generateUserDataWithUsername(username);
  await registrationPage.fillRegistrationForm(currentUserData);
});

When('I fill out the registration form but leave {string} empty', async function (field) {
  logTestStep(`Filling registration form but leaving ${field} empty`);
  currentUserData = generateUserData();
  await registrationPage.fillPartialRegistrationForm(currentUserData, field);
});

When('I submit the registration form', async function () {
  logTestStep('Submitting registration form');
  await registrationPage.submitRegistration();
});

Then('I should see a successful registration message', async function () {
  logTestStep('Verifying successful registration message');
  await registrationPage.verifySuccessfulRegistration();
});

Then('I should be redirected to the account overview page', async function () {
  logTestStep('Verifying redirect to account overview page');
  await dashboardPage.verifyAccountOverviewPage();
});

Then('I should see an error message indicating the username already exists', async function () {
  logTestStep('Verifying username exists error message');
  await registrationPage.verifyUsernameExistsError();
});

Then('I should see a validation error for the {string} field', async function (field) {
  logTestStep(`Verifying validation error for ${field} field`);
  await registrationPage.verifyValidationError(field);
});

// Login steps
Given('I have successfully registered a new account', async function () {
  logTestStep('Setting up: Registering new account');
  currentUserData = generateUserData();
  await registrationPage.navigateToRegistration();
  await registrationPage.fillRegistrationForm(currentUserData);
  await registrationPage.submitRegistration();
  await registrationPage.verifySuccessfulRegistration();
});

Given('I have successfully registered and logged in', async function () {
  logTestStep('Setting up: Registering and logging in');
  currentUserData = generateUserData();
  await registrationPage.navigateToRegistration();
  await registrationPage.fillRegistrationForm(currentUserData);
  await registrationPage.submitRegistration();
  await registrationPage.verifySuccessfulRegistration();
  // Already logged in after registration
});

Given('a user with username {string} already exists', async function (username) {
  logTestStep(`Setting up: Creating user with username ${username}`);
  // Create a user with the specified username first
  const userData = generateUserDataWithUsername(username);
  await registrationPage.navigateToRegistration();
  await registrationPage.fillRegistrationForm(userData);
  await registrationPage.submitRegistration();
  // Navigate back to registration for the test
  await registrationPage.navigateToRegistration();
});

When('I navigate to the login page', async function () {
  logTestStep('Navigating to login page');
  await loginPage.navigateToLogin();
});

When('I enter my username and password', async function () {
  logTestStep('Entering login credentials');
  await loginPage.login(currentUserData.username, currentUserData.password);
});

When('I enter invalid username {string} and password {string}', async function (username, password) {
  logTestStep(`Entering invalid credentials: ${username}/${password}`);
  await loginPage.login(username, password);
});

When('I click the Log In button', async function () {
  logTestStep('Clicking Log In button');
  // Login action is already performed in previous step
});

Then('I should be logged in successfully', async function () {
  logTestStep('Verifying successful login');
  await loginPage.verifySuccessfulLogin();
});

Then('I should see the account overview page', async function () {
  logTestStep('Verifying account overview page is displayed');
  await dashboardPage.verifyAccountOverviewPage();
});

Then('I should see an error message indicating invalid credentials', async function () {
  logTestStep('Verifying invalid credentials error message');
  await loginPage.verifyLoginError();
});

// Balance verification steps
When('I view the account overview page', async function () {
  logTestStep('Viewing account overview page');
  await dashboardPage.verifyAccountOverviewPage();
});

Then('I should see my account balance displayed', async function () {
  logTestStep('Verifying account balance is displayed');
  const balanceInfo = await dashboardPage.logAccountBalance();
  console.log('Account balance verification completed');
});

Then('the balance amount should be visible and properly formatted', async function () {
  logTestStep('Verifying balance format');
  await dashboardPage.verifyBalanceDisplay();
  console.log('Balance format verification completed');
});