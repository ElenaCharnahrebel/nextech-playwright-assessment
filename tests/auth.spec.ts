import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users, messages } from '../utils/testData';

test.describe('Authentication', () => {
  test('Valid login succeeds', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.valid.username, users.valid.password);

    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('Invalid login fails with error message', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.invalid.username, users.invalid.password);

    await login.assertErrorMessage(messages.invalidLogin);
  });
});