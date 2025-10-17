# ParaBank Automation Testing Framework

A comprehensive automation testing framework for ParaBank application using Playwright and POM (Page Object Model) patterns.

## 🚀 Features

- **Page Object Model**: Clean, maintainable page object classes
- **Cross-browser Testing**: Chrome, Firefox, Safari, and mobile browsers
- **Comprehensive Reporting**: HTML, JSON, and JUnit reports
- **Screenshot & Video**: Automatic capture on failures
- **Error Handling**: Robust error handling and retry mechanisms
- **Test Data Generation**: Dynamic test data using Faker.js

## 📁 Project Structure

```
parabank-automation/
├── README.md
├── package.json
├── playwright.config.js
├── cucumber.config.js
├── tests/
│   ├── features/
│   │   └── signup-login.feature      # 
│   ├── steps/
│   │   └── signup-login.steps.js     
│   └── parabank.spec.js              # Playwright test specs
├── pages/
│   ├── registrationPage.js           # Registration page object
│   ├── loginPage.js                  # Login page object
│   └── accountDashboardPage.js       # Dashboard page object
├── utils/
│   └── helpers.js                    # Utility functions
├── screenshots/                      # Test screenshots
├── test-results/                     # Test execution results
└── reports/                          # Test reports
```

## 🛠 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd parabank-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## 🧪 Test Execution

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### View Test Reports
```bash
npm run report
```

## 📋 Test Cases Covered

### Positive Test Cases
1. **TC001**: Successful user registration
2. **TC002**: Login with newly created account
3. **TC003**: Verify account balance display

### Negative Test Cases
4. **TC004**: Registration with duplicate username
5. **TC005**: Registration with missing required fields
6. **TC006**: Login with invalid credentials

## 🎯 Key Features

### Account Balance Verification
The framework automatically:
- Captures and logs account balance after successful login
- Verifies balance format ($X,XXX.XX)
- Takes screenshots for proof of execution
- Validates balance visibility

### Error Handling
- Retry mechanisms for flaky elements
- Custom timeouts for different scenarios
- Comprehensive error messages
- Screenshot capture on failures

### Data Management
- Dynamic test data generation using Faker.js
- Unique usernames with timestamps
- Configurable test data patterns

## 📊 Reporting

The framework generates multiple report formats:
- **HTML Report**: Visual test results with screenshots
- **JSON Report**: Machine-readable test results
- **JUnit Report**: CI/CD integration compatible

## 🔧 Configuration

### Playwright Configuration (`playwright.config.js`)
- Browser configuration (Chrome, Firefox, Safari)
- Test timeouts and retries
- Screenshot and video settings
- Base URL configuration

## 📱 Cross-Browser Support

Tests run on:
- Desktop: Chrome, Firefox, Safari
- Mobile: Chrome Mobile, Safari Mobile

## 🚦 CI/CD Integration

The framework is ready for CI/CD integration with:
- GitHub Actions
- Jenkins
- Azure DevOps
- CircleCI

## 📝 Best Practices Implemented

1. **Page Object Model**: Separates test logic from page interactions
2. **Error Handling**: Robust error handling and recovery
3. **Logging**: Comprehensive test execution logging
4. **Screenshots**: Visual proof of test execution
5. **Code Organization**: Clear folder structure and naming conventions

## 🔍 Test Data

Sample test user data structure:
```javascript
{
  firstName: "John",
  lastName: "Doe", 
  address: "123 Main St",
  city: "Anytown",
  state: "CA",
  zipCode: "12345",
  phone: "555-123-4567",
  ssn: "123-45-6789",
  username: "testuser1696234567890",
  password: "TestPassword123!"
}
```

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### View Test Results
- Screenshots: `screenshots/` directory
- Videos: `test-results/` directory
- Reports: `reports/` directory

## 📈 Performance

- Parallel test execution
- Optimized wait strategies
- Efficient element selectors
- Resource cleanup after tests

## 🤝 Contributing

1. Follow the established coding patterns
2. Add tests for new features
3. Update documentation
4. Ensure all tests pass before committing

## 📞 Support

For issues or questions:
1. Check the test reports for detailed error information
2. Review screenshots and videos in test-results
3. Check console logs for debugging information

---

**Happy Testing! 🎉**