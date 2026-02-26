# Nextech Playwright Take-Home Assessment

## Overview

This project implements a lightweight Playwright automation framework to validate core user flows on SauceDemo (https://www.saucedemo.com).

The objective was to deliver a small but production-minded automation suite that is:

- Maintainable
- Readable
- Reliable (low flakiness)
- Debuggable
- Scalable as coverage grows
- CI-ready

---

## Project Structure

tests/ → Test specifications (business logic + assertions only)
pages/ → Page Object classes (selectors + UI actions)
utils/ → Shared test data and reusable utilities

Separation of concerns ensures:

- Test files remain readable and focused on intent
- UI selectors are centralized
- Changes in UI impact only page classes
- Reduced duplication and improved maintainability

---

## Setup

Install dependencies:
npm ci

---

## Running Tests

### Run all tests (headless - default)
npx playwright test

### Run tests in headed mode (browser visible)
npx playwright test --headed

### Run in parallel (example: 4 workers)
npx playwright test --workers=4


### Run with explicit retry (to generate trace)
npx playwright test --retries=1

### View HTML report
npx playwright show-report

---

## Debugging & Failure Analysis

The framework is configured for strong debugging support:

- Screenshot: `only-on-failure`
- Trace: `on-first-retry`
- Video: `retain-on-failure`

To view a trace:
npx playwright show-trace test-results/**/trace.zip

Trace files allow step-by-step replay of execution, improving root cause analysis during failure investigation.

---

## Test Coverage

### Scenario A - Authentication
- Valid login succeeds
- Invalid login displays correct error message

### Scenario B — Purchase Flow
- Login
- Add item to cart
- Validate cart badge count updates correctly
- Validate price consistency between inventory and cart
- Complete checkout
- Validate order confirmation page

---

## Framework Design Decisions

### 1. Page Object Model

Selectors and common UI actions are encapsulated in Page Object classes under `/pages`.

This ensures:
- Test readability
- Reusability
- Reduced duplication
- Easier refactoring when UI changes

Tests contain no selectors, only high-level intent and assertions.

---

### 2. Config-Driven Execution

The `baseURL` is defined in `playwright.config.ts`, allowing environment flexibility without modifying test files.

Retry strategy and artifact capture are centrally configured, ensuring consistent behavior across local and CI runs.

---

### 3. Flakiness Prevention Practices

To minimize flaky tests:

- Avoided hard waits (`waitForTimeout`)
- Leveraged Playwright’s auto-waiting mechanism
- Used explicit assertions before moving to the next step
- Preferred stable selectors (`data-test` attributes)
- Enabled trace and screenshots for quick failure diagnosis

---

## Scalability Strategy (If Expanded to 1,000 Tests)

If this suite scaled significantly, the first improvements would include:

1. Test tagging (smoke, regression, critical-path) to optimize CI feedback cycles
2. CI sharding across multiple agents to maintain fast execution times
3. Flaky test detection and reporting dashboards
4. Test data factories and environment-aware fixtures
5. Increased API/service-level coverage to reduce UI execution time
6. Quality gates integrated into pull request workflows

These changes would ensure the suite remains fast, stable, and maintainable as it grows.

---

## CI Readiness

The project includes a GitHub Actions workflow to support automated test execution in CI environments.

---

## Final Notes

This implementation balances speed of delivery with engineering discipline.  
It demonstrates how a small automation suite can be structured to scale in a SaaS product environment while maintaining reliability and clarity.