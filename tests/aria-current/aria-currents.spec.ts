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

  describe('about page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/sl/about');
    });

    test('about link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['O projektu', 'O projektu'],
      });
    });
  });

  describe('faq page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/sl/faq');
    });

    test('faq link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Pojasnila', 'Pojasnila'],
      });
    });
  });

  describe('gp page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/sl/gp');
    });

    test('gp link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Imenik', 'Družinski zdravnik'],
      });
    });
  });

  describe('ped page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/sl/ped');
    });

    test('ped link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Imenik', 'Pediater'],
      });
    });
  });

  describe('den page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/sl/den');
    });

    test('den link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Imenik', 'Zobozdravnik'],
      });
    });
  });

  describe('den-y page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/sl/den-y');
    });

    test('den-y link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Imenik', 'Zobozdravnik - Mladina'],
      });
    });
  });

  describe('den-s page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/sl/den-s');
    });

    test('den-s link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Imenik', 'Zobozdravnik - Študenti'],
      });
    });
  });

  describe('gyn page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/sl/gyn');
    });

    test('gyn link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Imenik', 'Ginekolog'],
      });
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

  describe('about page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/en/about');
    });

    test('about link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({ page, count: 2, texts: ['About', 'About'] });
    });
  });

  describe('faq page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/en/faq');
    });

    test('faq link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({ page, count: 2, texts: ['FAQ', 'FAQ'] });
    });
  });

  describe('gp page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/en/gp');
    });

    test('gp link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Home', 'General Practitioner'],
      });
    });
  });

  describe('ped page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/en/ped');
    });

    test('ped link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Home', 'Pediatrician'],
      });
    });
  });

  describe('den page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/en/den');
    });

    test('den link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({ page, count: 2, texts: ['Home', 'Dentist'] });
    });
  });

  describe('den-y page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/en/den-y');
    });

    test('den-y link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Home', 'Dentist - Youth'],
      });
    });
  });

  describe('den-s page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/en/den-s');
    });

    test('den-s link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Home', 'Dentist - Student'],
      });
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

  describe('about page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/it/about');
    });

    test('about link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Il progetto', 'Il progetto'],
      });
    });
  });

  describe('faq page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/it/faq');
    });

    test('faq link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['FAQ', 'FAQ'],
      });
    });
  });

  describe('gp page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/it/gp');
    });

    test('gp link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Elenco', 'Medico di famiglia'],
      });
    });
  });

  describe('ped page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/it/ped');
    });

    test('ped link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Elenco', 'Pediatra'],
      });
    });
  });

  describe('den page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/it/den');
    });

    test('den link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Elenco', 'Dentista'],
      });
    });
  });

  describe('den-y page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/it/den-y');
    });

    test('den-y link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Elenco', 'Dentista - Giovani'],
      });
    });
  });

  describe('den-s page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/it/den-s');
    });

    test('den-s link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Elenco', 'Dentista - Studenti'],
      });
    });
  });

  describe('gyn page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('localhost:3000/it/gyn');
    });

    test('gyn link has aria-current set to page', async ({ page }) => {
      await expectAriaCurrent({
        page,
        count: 2,
        texts: ['Elenco', 'Ginecologo'],
      });
    });
  });
});
