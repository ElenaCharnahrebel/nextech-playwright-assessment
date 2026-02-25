# Nextech Playwright Take-Home Assessment

## Overview

This project implements a lightweight Playwright automation framework for testing core user flows on SauceDemo (https://www.saucedemo.com).

The goal of this implementation was to create a test suite that is:

- Easy to maintain
- Easy to debug
- Reliable (minimal flakiness)
- Scalable as the test suite grows
- Ready to run locally and in CI environments

---

## Project Structure
tests/ → Test specifications (business logic + assertions)
pages/ → Page Object classes (selectors + UI actions)
utils/ → Shared test data and utilities

This separation ensures:
- Clean test files
- Reusable UI logic
- Minimal duplication
- Clear ownership boundaries

---

## Setup

Install dependencies:
npm ci

---

## Running Tests

### Run all tests (headless)
npx playwright test

### Run tests in headed mode
npx playwright test --headed

### Run in parallel
npx playwright test --workers=4

### View HTML report
npx playwright show-report

---

## Debugging Support

The framework is configured for strong debuggability:

- Screenshots: `only-on-failure`
- Trace: `on-first-retry`
- Video: `retain-on-failure`

To view a trace file:
npx playwright show-trace test-results/**/trace.zip

This allows step-by-step replay of failed executions for faster root cause analysis.

---

## Test Coverage

### Scenario A — Authentication
- Valid login succeeds
- Invalid login displays correct error message

### Scenario B — Purchase Flow
- Login
- Add item to cart
- Validate cart badge count
- Validate price consistency between inventory and cart
- Complete checkout
- Validate order confirmation

---

## Framework Design Decisions

### Page Object Model
Selectors and reusable actions are encapsulated within Page Object classes under `/pages`.  
Tests focus only on intent and validation.

Benefits:
- Improved readability
- Reduced duplication
- Easier maintenance when UI changes

### Config-Driven Base URL
The `baseURL` is defined in `playwright.config.ts`, allowing flexible environment targeting without modifying test files.

### Minimal Flakiness Approach
- Avoided fixed waits (`waitForTimeout`)
- Relied on Playwright’s auto-waiting behavior
- Used explicit assertions before moving to next steps
- Preferred stable selectors (`data-test` attributes)

### Debug-First Strategy
Trace and screenshot capture are enabled to reduce time-to-resolution during failure analysis.

---

## Scalability Strategy (If Expanded to 1,000 Tests)

If the test suite were to scale significantly, the following improvements would be implemented:

1. Test tagging (smoke, regression, critical-path)
2. CI sharding and parallel execution across agents
3. Reporting dashboard for trend and flaky-test detection
4. Test data management via fixtures/factories
5. Introduce API-level tests to reduce UI execution time
6. Establish quality gates for pull requests

This ensures performance, maintainability, and reliability at scale.

---

## CI Readiness

The project includes GitHub Actions configuration to support automated execution in CI environments.

---

## Conclusion

This implementation balances speed of delivery with maintainable design principles.  
It demonstrates a scalable foundation suitable for a growing SaaS product automation suite.
