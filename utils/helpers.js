const { faker } = require('@faker-js/faker');

/**
 * Generate random user data for testing
 * @returns {Object} User data object
 */
function generateUserData() {
  const timestamp = Date.now();
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.stateAbbr(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number('###-###-####'),
    ssn: faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
    username: `i${timestamp}vupra`,
    password: `T${timestamp}!`
  };
}

/**
 * Generate user data with specific username
 * @param {string} username - Specific username to use
 * @returns {Object} User data object
 */
function generateUserDataWithUsername(username) {
  const userData = generateUserData();
  userData.username = username;
  return userData;
}

/**
 * Generate invalid user data for negative testing
 * @returns {Object} Invalid user data object
 */
function generateInvalidUserData() {
  return {
    firstName: '',
    lastName: '',
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.stateAbbr(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number('###-###-####'),
    ssn: faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
    username: '',
    password: ''
  };
}

/**
 * Wait for element to be visible with custom timeout
 * @param {Object} page - Playwright page object
 * @param {string} selector - Element selector
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 */
async function waitForElement(page, selector, timeout = 10000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * Take screenshot with timestamp
 * @param {Object} page - Playwright page object
 * @param {string} name - Screenshot name
 */
async function takeScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `screenshots/${name}-${timestamp}.png`,
    fullPage: true
  });
}

/**
 * Clear field and fill with new value
 * @param {Object} locator - Playwright locator
 * @param {string} value - Value to fill
 */
async function clearAndFill(locator, value) {
  await locator.clear();
  await locator.fill(value);
}

/**
 * Wait for page to load completely
 * @param {Object} page - Playwright page object
 */
async function waitForPageLoad(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = baseDelay * Math.pow(2, i);
      console.log(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * Log test step with timestamp
 * @param {string} step - Test step description
 */
function logTestStep(step) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${step}`);
}

/**
 * Format currency for comparison
 * @param {string} amount - Amount string
 * @returns {number} Formatted number
 */
function formatCurrency(amount) {
  return parseFloat(amount.replace(/[$,]/g, ''));
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  generateUserData,
  generateUserDataWithUsername,
  generateInvalidUserData,
  waitForElement,
  takeScreenshot,
  clearAndFill,
  waitForPageLoad,
  retryWithBackoff,
  logTestStep,
  formatCurrency,
  isValidEmail
};