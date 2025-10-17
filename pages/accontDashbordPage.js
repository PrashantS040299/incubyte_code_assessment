const { expect } = require('@playwright/test');

class AccountDashboardPage {
  constructor(page) {
    this.page = page;
    
    // Account overview locators
    this.pageTitle = page.locator('h1.title');
    this.accountsTable = page.locator('#accountTable');
    this.balanceElements = page.locator('td.ng-binding');
    this.totalBalance = page.locator('.ng-binding');
    
    // Account details locators
    this.accountNumbers = page.locator('a[href*=\"activity.htm\"]');
    this.balanceAmounts = page.locator('td:nth-child(2)');
    this.availableAmounts = page.locator('td:nth-child(3)');
    
    // Navigation locators
    this.logoutLink = page.locator('a[href*=\"logout.htm\"]');
    this.openNewAccountLink = page.locator('a[href*=\"openaccount.htm\"]');
    this.transferFundsLink = page.locator('a[href*=\"transfer.htm\"]');
    
    // Welcome message
    this.welcomeMessage = page.locator('p.smallText');
  }

  /**
   * Verify user is on account overview page
   */
  async verifyAccountOverviewPage() {
    await expect(this.pageTitle).toContainText('Accounts Overview');
    await expect(this.page).toHaveURL(/.*overview.htm/);
  }

  /**
   * Get and log account balance information
   * @returns {Object} Balance information
   */
  async getAccountBalance() {
    await this.verifyAccountOverviewPage();
    
    // Wait for accounts table to be visible
    await expect(this.accountsTable).toBeVisible();
    
    // Get balance information
    const balanceElements = await this.balanceAmounts.allTextContents();
    const availableElements = await this.availableAmounts.allTextContents();
    
    const balanceInfo = {
      accounts: [],
      totalBalance: ''
    };

    // Extract individual account balances
    for (let i = 0; i < balanceElements.length; i++) {
      if (balanceElements[i] && availableElements[i]) {
        balanceInfo.accounts.push({
          balance: balanceElements[i].trim(),
          available: availableElements[i].trim()
        });
      }
    }

    // Get total balance if available
    try {
      const totalElement = await this.totalBalance.first().textContent();
      if (totalElement) {
        balanceInfo.totalBalance = totalElement.trim();
      }
    } catch (error) {
      console.log('Total balance element not found');
    }

    return balanceInfo;
  }

  /**
   * Log account balance to console
   */
  async logAccountBalance() {
    const balanceInfo = await this.getAccountBalance();
    
    console.log('=== ACCOUNT BALANCE INFORMATION ===');
    console.log(`Number of accounts: ${balanceInfo.accounts.length}`);
    
    balanceInfo.accounts.forEach((account, index) => {
      console.log(`Account ${index + 1}:`);
      console.log(`  Balance: ${account.balance}`);
      console.log(`  Available: ${account.available}`);
    });
    
    if (balanceInfo.totalBalance) {
      console.log(`Total Balance: ${balanceInfo.totalBalance}`);
    }
    
    console.log('====================================');
    
    return balanceInfo;
  }

  /**
   * Verify that balance is displayed and properly formatted
   */
  async verifyBalanceDisplay() {
    const balanceInfo = await this.getAccountBalance();
    
    // Verify at least one account exists
    expect(balanceInfo.accounts.length).toBeGreaterThan(0);
    
    // Verify balance format (should contain $ and be properly formatted)
    balanceInfo.accounts.forEach((account, index) => {
      expect(account.balance).toMatch(/^\$[\d,]+\.\d{2}$/);
      expect(account.available).toMatch(/^\$[\d,]+\.\d{2}$/);
      console.log(`Account ${index + 1} balance verified: ${account.balance}`);
    });
    
    return true;
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage() {
    return await this.welcomeMessage.textContent();
  }

  /**
   * Navigate to open new account page
   */
  async openNewAccount() {
    await this.openNewAccountLink.click();
  }

  /**
   * Navigate to transfer funds page
   */
  async transferFunds() {
    await this.transferFundsLink.click();
  }

  /**
   * Logout from the application
   */
  async logout() {
    await this.logoutLink.click();
    await expect(this.page).toHaveURL(/.*index.htm/);
  }

  /**
   * Verify user is logged in
   */
  async verifyUserLoggedIn() {
    await expect(this.logoutLink).toBeVisible();
    await expect(this.welcomeMessage).toBeVisible();
  }
}

module.exports = { AccountDashboardPage };