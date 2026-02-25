import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { users } from '../utils/testData';

test('Purchase flow - happy path + cart badge + price consistency', async ({ page }) => {
  const itemName = 'Sauce Labs Backpack';

  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const overview = new CheckoutOverviewPage(page);
  const complete = new CheckoutCompletePage(page);

  // Login
  await login.goto();
  await login.login(users.valid.username, users.valid.password);
  await inventory.assertLoaded();

  // Add item + validate cart badge count
  const priceOnInventory = await inventory.itemPrice(itemName).innerText();
  await inventory.addItemToCart(itemName);
  await inventory.assertCartBadgeCount('1');

  // Go to cart + validate price consistency
  await inventory.goToCart();
  await cart.assertLoaded();
  const priceInCart = await cart.cartItemPrice(itemName).innerText();
  expect(priceInCart).toBe(priceOnInventory);

  // Checkout
  await cart.checkout();
  await checkout.fillInformation('Elena', 'QA', '28117');
  await overview.finish();

  // Assert completion
  await complete.assertOrderComplete();
});