#!/bin/bash

# ParaBank Automation Test Execution Script
echo "======================================"
echo "   ParaBank Automation Test Suite"
echo "======================================"

# Create necessary directories
echo "Creating required directories..."
mkdir -p screenshots
mkdir -p test-results
mkdir -p reports

echo "Installing dependencies..."
npm install

echo "Installing Playwright browsers..."
npx playwright install

echo "======================================"
echo "Running Test Suite..."
echo "======================================"

# Run the main test suite
echo "🧪 Running Playwright tests..."
npx playwright test tests/parabank.spec.js --reporter=html

echo "📊 Generating test report..."
npx playwright show-report

echo "======================================"
echo "Test execution completed!"
echo "======================================"

echo "📁 Check the following for results:"
echo "   - HTML Report: playwright-report/index.html"
echo "   - Screenshots: screenshots/"
echo "   - Test Results: test-results/"

echo "🚀 To view the report, run: npx playwright show-report"