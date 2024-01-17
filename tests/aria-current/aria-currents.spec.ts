import { test, expect, Page } from '@playwright/test';

const { describe } = test;

const expectAriaCurrent = async function ({
  page,
  count,
  texts,
}: {
  page: Page;
  count: number;
  texts: string[];
}) {
  const ariaCurrent = page.locator('[aria-current="page"]');
  await expect(ariaCurrent).toHaveCount(count);
  await expect(ariaCurrent).toContainText(texts);
};

describe('Slovenian', () => {
  describe('home page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/sl');
    });

    test('home link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({ page, count: 2, texts: ['logo', 'Zdravniki'] });
    });
  });
});

describe('English', () => {
  describe('home page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/en');
    });

    test('home link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({ page, count: 2, texts: ['logo', 'Doctors'] });
    });
  });
});

describe('Italian', () => {
  describe('home page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/it');
    });

    test('home link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({ page, count: 2, texts: ['logo', 'Medici'] });
    });
  });
});
