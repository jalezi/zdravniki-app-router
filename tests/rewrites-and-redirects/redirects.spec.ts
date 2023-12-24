import { test, expect } from '@playwright/test';

import { ROUTES_TRANSLATIONS } from '@/lib/constants/segments';
import { Locales } from '@/locales/config';

const { describe } = test;

const baseUrl = 'http://localhost:3000';

function getRedirectedURL(locale: Locales, segment: string) {
  return `${baseUrl}/${locale}/${segment}/`;
}

describe('Redirects', () => {
  describe('Faq pages', () => {
    // FAQ PAGES
    // SLOVENIAN FAQ PAGE
    describe('Slovenian faq page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.sl.faq;
      const expectedURL = getRedirectedURL('sl', expectedSegment);
      test('Should redirect /sl/faq to /sl/pogosta-vprasanja', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/faq');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/domande-frequenti to /sl/pogosta-vprasanja', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/domande-frequenti');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ENGLISH FAQ PAGE
    describe('English faq page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.en.faq;
      const expectedURL = getRedirectedURL('en', expectedSegment);

      test('Should redirect /en/pogosta-vprasanja to /en/faq', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/pogosta-vprasanja');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/domande-frequenti to /en/faq', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/domande-frequenti');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ITALIAN FAQ PAGE
    describe('Italian faq page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.it.faq;
      const expectedURL = getRedirectedURL('it', expectedSegment);
      test('Should redirect /it/faq to /it/domande-frequenti', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/faq');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/pogosta-vprasanja to /it/domande-frequenti', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/pogosta-vprasanja');

        await expect(page).toHaveURL(expectedURL);
      });
    });
  });

  describe('About pages', () => {
    // ABOUT PAGES
    // SLOVENIAN ABOUT PAGE
    describe('Slovenian about page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.sl.about;
      const expectedURL = getRedirectedURL('sl', expectedSegment);
      test('Should redirect /sl/about to /sl/o-projektu', async ({ page }) => {
        await page.goto('localhost:3000/sl/about');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/il-progetto to /sl/o-projektu', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/il-progetto');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ENGLISH ABOUT PAGE
    describe('English about page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.en.about;
      const expectedURL = getRedirectedURL('en', expectedSegment);
      test('Should redirect /en/o-projektu to /en/about', async ({ page }) => {
        await page.goto('localhost:3000/en/o-projektu');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/il-progetto to /en/about', async ({ page }) => {
        await page.goto('localhost:3000/en/il-progetto');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ITALIAN ABOUT PAGE
    describe('Italian about page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.it.about;
      const expectedURL = getRedirectedURL('it', expectedSegment);
      test('Should redirect /it/about to /it/il-progetto', async ({ page }) => {
        await page.goto('localhost:3000/it/about');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/o-projektu to /it/il-progetto', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/o-projektu');

        await expect(page).toHaveURL(expectedURL);
      });
    });
  });

  describe('Gp pages', () => {
    // GP PAGES
    // SLOVENIAN GP PAGE
    describe('Slovenian gp page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.sl.gp;
      const expectedURL = getRedirectedURL('sl', expectedSegment);
      test('Should redirect /sl/gp to /sl/druzinski-zdravnik', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/gp');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/general-practitioner to /sl/druzinski-zdravnik', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/general-practitioner');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/medico-di-famiglia to /sl/druzinski-zdravnik', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/medico-di-famiglia');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ENGLISH GP PAGE
    describe('English gp page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.en.gp;
      const expectedURL = getRedirectedURL('en', expectedSegment);
      test('Should redirect /en/gp to /en/general-practitioner', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/gp');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/medico-di-famiglia to /en/general-practitioner', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/medico-di-famiglia');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/druzinski-zdravnik to /en/general-practitioner', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/druzinski-zdravnik');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ITALIAN GP PAGE
    describe('Italian gp page to /it/medico-di-famiglia/', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.it.gp;
      const expectedURL = getRedirectedURL('it', expectedSegment);
      test('Should redirect /it/gp', async ({ page }) => {
        await page.goto('localhost:3000/it/gp');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/general-practitioner to /it/medico-di-famiglia/', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/general-practitioner');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/druzinski-zdravnik to /it/medico-di-famiglia/', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/druzinski-zdravnik');

        await expect(page).toHaveURL(expectedURL);
      });
    });
  });

  describe('Ped pages', () => {
    // PED PAGES
    // SLOVENIAN PED PAGE
    describe('Slovenian ped page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.sl.ped;
      const expectedURL = getRedirectedURL('sl', expectedSegment);
      test('Should redirect /sl/ped to /sl/pediater', async ({ page }) => {
        await page.goto('localhost:3000/sl/ped');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/pediatrician to /sl/pediater', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/pediatrician');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/pediatra to /sl/pediater', async ({ page }) => {
        await page.goto('localhost:3000/sl/pediatra');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ENGLISH PED PAGE
    describe('English ped page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.en.ped;
      const expectedURL = getRedirectedURL('en', expectedSegment);
      test('Should redirect /en/ped to /en/pediatrician', async ({ page }) => {
        await page.goto('localhost:3000/en/ped');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/pediater to /en/pediatrician', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/pediater');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/pediatra to /en/pediatrician', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/pediatra');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ITALIAN PED PAGE
    describe('Italian ped page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.it.ped;
      const expectedURL = getRedirectedURL('it', expectedSegment);
      test('Should redirect /it/ped to /it/pediatra', async ({ page }) => {
        await page.goto('localhost:3000/it/ped');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/pediater to /it/pediatra', async ({ page }) => {
        await page.goto('localhost:3000/it/pediater');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/pediatrician to /it/pediatra', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/pediatrician');

        await expect(page).toHaveURL(expectedURL);
      });
    });
  });

  describe('Gyn pages', () => {
    // GYN PAGES
    // SLOVENIAN GYN PAGE
    describe('Slovenian gyn page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.sl.gyn;
      const expectedURL = getRedirectedURL('sl', expectedSegment);
      test('Should redirect /sl/gyn to /sl/ginekolog', async ({ page }) => {
        await page.goto('localhost:3000/sl/gyn');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/gynecologist to /sl/ginekolog', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/gynecologist');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/ginecologo to /sl/ginekolog', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/ginecologo');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ENGLISH GYN PAGE
    describe('English gyn page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.en.gyn;
      const expectedURL = getRedirectedURL('en', expectedSegment);
      test('Should redirect /en/gyn to /en/gynecologist', async ({ page }) => {
        await page.goto('localhost:3000/en/gyn');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/ginecologo to /en/gynecologist', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/ginecologo');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/ginekolog to /en/gynecologist', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/ginekolog');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ITALIAN GYN PAGE
    describe('Italian gyn page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.it.gyn;
      const expectedURL = getRedirectedURL('it', expectedSegment);
      test('Should redirect /it/gyn to /it/ginecologo', async ({ page }) => {
        await page.goto('localhost:3000/it/gyn');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/gynecologist to /it/ginecologo', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/gynecologist');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/ginekolog to /it/ginecologo', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/ginekolog');

        await expect(page).toHaveURL(expectedURL);
      });
    });
  });

  describe('Den pages', () => {
    // DEN PAGE
    // SLOVENIAN DEN PAGE
    describe('Slovenian den page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.sl.den;
      const expectedURL = getRedirectedURL('sl', expectedSegment);
      test('Should redirect /sl/den to /sl/zobozdravnik', async ({ page }) => {
        await page.goto('localhost:3000/sl/den');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/dentist to /sl/zobozdravnik', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/dentist');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/dentista to /sl/zobozdravnik', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/dentista');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ENGLISH DEN PAGE
    describe('English den page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.en.den;
      const expectedURL = getRedirectedURL('en', expectedSegment);
      test('Should redirect /en/den to /en/dentist', async ({ page }) => {
        await page.goto('localhost:3000/en/den');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/zobozdravnik /en/dentist', async ({ page }) => {
        await page.goto('localhost:3000/en/zobozdravnik');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/dentista /en/dentist', async ({ page }) => {
        await page.goto('localhost:3000/en/dentista');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ITALIAN DEN PAGE
    describe('Italian den page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.it.den;
      const expectedURL = getRedirectedURL('it', expectedSegment);
      test('Should redirect /it/den to /it/dentista', async ({ page }) => {
        await page.goto('localhost:3000/it/den');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/zobozdravnik to /it/dentista', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/zobozdravnik');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/dentist to /it/dentista', async ({ page }) => {
        await page.goto('localhost:3000/it/dentist');

        await expect(page).toHaveURL(expectedURL);
      });
    });
  });

  describe('Den-s pages', () => {
    // DEN-S PAGE
    // SLOVENIAN DEN-S PAGE
    describe('Slovenian den student page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.sl['den-s'];
      const expectedURL = getRedirectedURL('sl', expectedSegment);
      test('Should redirect /sl/den-s to /sl/zobozdravnik-student', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/den-s');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/dentist-students to /sl/zobozdravnik-student', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/dentist-students');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/dentista-studenti to /sl/zobozdravnik-student', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/dentista-studenti');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ENGLISH DEN-S PAGE
    describe('English den student page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.en['den-s'];
      const expectedURL = getRedirectedURL('en', expectedSegment);
      test('Should redirect /en/den-s to /en/dentist-student', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/den-s');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/zobozdravnik-studenti to /en/dentist-students', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/zobozdravnik-studenti');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/dentista-studenti to /en/dentist-student', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/dentista-studenti');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ITALIAN DEN-S PAGE
    describe('Italian den student page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.it['den-s'];
      const expectedURL = getRedirectedURL('it', expectedSegment);
      test('Should redirect /it/den-s to /it/dentista-studenti', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/den-s');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/zobozdravnik-studenti to /it/dentista-studenti', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/zobozdravnik-studenti');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/dentist-students to /it/dentista-studenti', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/dentist-students');

        await expect(page).toHaveURL(expectedURL);
      });
    });
  });

  describe('Den-y pages', () => {
    // DEN-Y PAGE
    // SLOVENIAN DEN-Y PAGE
    describe('Slovenian den youth page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.sl['den-y'];
      const expectedURL = getRedirectedURL('sl', expectedSegment);
      test('Should redirect /sl/den-y to /sl/zobozdravnik-mladina', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/den-y');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/dentist-youth to /sl/zobozdravnik-mladina', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/dentist-youth');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /sl/dentista-giovani to /sl/zobozdravnik-mladina', async ({
        page,
      }) => {
        await page.goto('localhost:3000/sl/dentista-giovani');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ENGLISH DEN-Y PAGE
    describe('English den youth page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.en['den-y'];
      const expectedURL = getRedirectedURL('en', expectedSegment);
      test('Should redirect /en/den-y to /en/dentist-youth', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/den-y');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/zobozdravnik-mladina to /en/dentist-youth', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/zobozdravnik-mladina');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /en/dentista-giovani to /en/dentist-youth', async ({
        page,
      }) => {
        await page.goto('localhost:3000/en/dentista-giovani');

        await expect(page).toHaveURL(expectedURL);
      });
    });

    // ITALIAN DEN-Y PAGE
    describe('Italian den youth page', () => {
      const expectedSegment = ROUTES_TRANSLATIONS.it['den-y'];
      const expectedURL = getRedirectedURL('it', expectedSegment);
      test('Should redirect /it/den-y to /it/dentista-giovani', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/den-y');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/zobozdravnik-mladina to /it/dentista-giovani', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/zobozdravnik-mladina');

        await expect(page).toHaveURL(expectedURL);
      });

      test('Should redirect /it/dentist-youth to /it/dentista-giovani', async ({
        page,
      }) => {
        await page.goto('localhost:3000/it/dentist-youth');

        await expect(page).toHaveURL(expectedURL);
      });
    });
  });
});
