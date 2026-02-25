import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  cartItemPrice(itemName: string): Locator {
    return this.page
      .locator('.cart_item')
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: itemName }) })
      .locator('.inventory_item_price');
  }

  async assertLoaded() {
    await expect(this.title).toHaveText('Your Cart');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}