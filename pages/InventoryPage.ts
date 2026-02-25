import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  itemPrice(itemName: string): Locator {
    // SauceDemo markup: find item by name, then navigate to its price element
    return this.page
      .locator('.inventory_item')
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: itemName }) })
      .locator('.inventory_item_price');
  }

  addToCartButton(itemName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: itemName }) })
      .locator('button:has-text("Add to cart")');
  }

  async assertLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addItemToCart(itemName: string) {
    await this.addToCartButton(itemName).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async assertCartBadgeCount(expected: string) {
    await expect(this.cartBadge).toHaveText(expected);
  }
}