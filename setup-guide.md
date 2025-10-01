PARABANK AUTOMATION FRAMEWORK - COMPLETE FILE STRUCTURE
=======================================================

parabank-automation/
├── README.md                          # Project documentation
├── package.json                       # Node.js dependencies and scripts
├── playwright.config.js              # Playwright configuration
├── cucumber.config.js                # Cucumber BDD configuration
├── .gitignore                         # Git ignore rules
├── run-tests.sh                       # Test execution script
│
├── tests/                             # Test files directory
│   ├── features/
│   │   └── signup-login.feature       # BDD feature file (Gherkin)
│   ├── steps/
│   │   └── signup-login.steps.js      # Cucumber step definitions
│   ├── parabank.spec.js              # Main Playwright test suite
│   └── demo.spec.js                  # Assessment demonstration test
│
├── pages/                             # Page Object Model classes
│   ├── registrationPage.js           # Registration page interactions
│   ├── loginPage.js                  # Login page interactions
│   └── accountDashboardPage.js       # Dashboard page interactions
│
├── utils/                             # Utility functions
│   └── helpers.js                     # Helper functions and test data
│
├── screenshots/                       # Auto-generated screenshots
├── test-results/                      # Test execution results
├── reports/                           # Test reports (HTML, JSON, etc.)
└── playwright-report/                 # Playwright HTML reports

SETUP INSTRUCTIONS:
==================

1. Create project directory:
   mkdir parabank-automation
   cd parabank-automation

2. Initialize npm project:
   npm init -y

3. Copy all provided files to respective directories

4. Install dependencies:
   npm install

5. Install Playwright browsers:
   npx playwright install

6. Run tests:
   npm test
   
   OR
   
   chmod +x run-tests.sh
   ./run-tests.sh

KEY FEATURES IMPLEMENTED:
========================

✅ BDD (Behavior-Driven Development) with Cucumber
✅ POM (Page Object Model) architecture
✅ Complete sign-up and login automation
✅ Account balance extraction and logging
✅ Cross-browser testing support
✅ Screenshot and video capture
✅ Comprehensive error handling
✅ Dynamic test data generation
✅ Multiple reporting formats
✅ CI/CD ready configuration

TEST COVERAGE:
=============

POSITIVE TESTS:
- User registration with valid data
- Login with newly created account
- Account balance verification and display

NEGATIVE TESTS:
- Registration with duplicate username
- Registration with missing required fields
- Login with invalid credentials

EXECUTION COMMANDS:
==================

# Run all tests
npm test

# Run in headed mode (visible browser)
npm run test:headed

# Run in debug mode
npm run test:debug

# Run specific test file
npx playwright test tests/demo.spec.js

# Run with specific browser
npx playwright test --project=chromium

# Generate and view report
npx playwright show-report

PROOF OF EXECUTION:
==================

The framework automatically captures:
- Screenshots at key steps
- Video recordings on failures
- Console logs with timestamps
- HTML test reports
- Account balance information

All files are structured for easy GitHub repository upload with clear commit history.