import { test, expect } from '@playwright/test';

const { describe } = test;

describe('Slovenian home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('localhost:3000/sl');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Zdravniki - Zdravniki Sledilnik/);

    await expect(page.locator('h1')).toHaveText('Pozdravljen, svet!');
  });
});

describe('English home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('localhost:3000/en');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Doctors - Zdravniki Sledilnik/);

    await expect(page.locator('h1')).toHaveText('Hello, World!');
  });
});

describe('Italian home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('localhost:3000/it');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Medici - Zdravniki Sledilnik/);

    await expect(page.locator('h1')).toHaveText('Ciao, mondo!');
  });
});
