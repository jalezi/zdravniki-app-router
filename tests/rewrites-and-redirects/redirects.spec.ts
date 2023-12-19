import { test, expect } from '@playwright/test';

const { describe } = test;

describe('Redirects', () => {
  // FAQ PAGE
  // SLOVENIAN FAQ PAGE
  describe('Slovenian faq page', () => {
    test('Should redirect /sl/faq to /sl/pogosta-vprasanja', async ({
      page,
    }) => {
      await page.goto('localhost:3000/sl/faq');

      await expect(page).toHaveURL(
        'http://localhost:3000/sl/pogosta-vprasanja/'
      );
    });

    test('Should redirect /sl/domande-frequenti to /sl/pogosta-vprasanja', async ({
      page,
    }) => {
      await page.goto('localhost:3000/sl/domande-frequenti');

      await expect(page).toHaveURL(
        'http://localhost:3000/sl/pogosta-vprasanja/'
      );
    });
  });

  // ENGLISH FAQ PAGE
  describe('English faq page', () => {
    test('Should redirect /en/faq to /en/pogosta-vprasanja', async ({
      page,
    }) => {
      await page.goto('localhost:3000/en/faq');

      await expect(page).toHaveURL('http://localhost:3000/en/faq/');
    });

    test('Should redirect /en/pogosta-vprasanja to /en/faq', async ({
      page,
    }) => {
      await page.goto('localhost:3000/en/pogosta-vprasanja');

      await expect(page).toHaveURL('http://localhost:3000/en/faq/');
    });

    test('Should redirect /en/domande-frequenti to /en/faq', async ({
      page,
    }) => {
      await page.goto('localhost:3000/en/domande-frequenti');

      await expect(page).toHaveURL('http://localhost:3000/en/faq/');
    });
  });

  // ITALIAN FAQ PAGE
  describe('Italian faq page', () => {
    test('Should redirect /it/faq to /it/domande-frequenti', async ({
      page,
    }) => {
      await page.goto('localhost:3000/it/faq');

      await expect(page).toHaveURL(
        'http://localhost:3000/it/domande-frequenti/'
      );
    });

    test('Should redirect /it/pogosta-vprasanja to /it/domande-frequenti', async ({
      page,
    }) => {
      await page.goto('localhost:3000/it/pogosta-vprasanja');

      await expect(page).toHaveURL(
        'http://localhost:3000/it/domande-frequenti/'
      );
    });
  });

  // ABOUT PAGE
  // SLOVENIAN ABOUT PAGE
  describe('Slovenian about page', () => {
    test('Should redirect /sl/about to /sl/o-projektu', async ({ page }) => {
      await page.goto('localhost:3000/sl/about');

      await expect(page).toHaveURL('http://localhost:3000/sl/o-projektu/');
    });

    test('Should redirect /sl/il-progetto to /sl/o-projektu', async ({
      page,
    }) => {
      await page.goto('localhost:3000/sl/il-progetto');

      await expect(page).toHaveURL('http://localhost:3000/sl/o-projektu/');
    });
  });

  // SLOVENIAN GP PAGE
  describe('Slovenian gp page', () => {
    test('Should redirect /sl/gp to /sl/druzinski-zdravnik', async ({
      page,
    }) => {
      await page.goto('localhost:3000/sl/gp');

      await expect(page).toHaveURL(
        'http://localhost:3000/sl/druzinski-zdravnik/'
      );
    });

    test('Should redirect /sl/general-practitioner to /sl/druzinski-zdravnik', async ({
      page,
    }) => {
      await page.goto('localhost:3000/sl/general-practitioner');

      await expect(page).toHaveURL(
        'http://localhost:3000/sl/druzinski-zdravnik/'
      );
    });

    test('Should redirect /sl/medico-di-famiglia to /sl/druzinski-zdravnik', async ({
      page,
    }) => {
      await page.goto('localhost:3000/sl/medico-di-famiglia');

      await expect(page).toHaveURL(
        'http://localhost:3000/sl/druzinski-zdravnik/'
      );
    });
  });
});

// ENGLISH GP PAGE
describe('English gp page', () => {
  test('Should redirect /en/gp to /en/general-practitioner', async ({
    page,
  }) => {
    await page.goto('localhost:3000/en/gp');

    await expect(page).toHaveURL(
      'http://localhost:3000/en/general-practitioner/'
    );
  });

  test('Should redirect /en/medico-di-famiglia to /en/general-practitioner', async ({
    page,
  }) => {
    await page.goto('localhost:3000/en/medico-di-famiglia');

    await expect(page).toHaveURL(
      'http://localhost:3000/en/general-practitioner/'
    );
  });

  test('Should redirect /en/druzinski-zdravnik to /en/general-practitioner', async ({
    page,
  }) => {
    await page.goto('localhost:3000/en/druzinski-zdravnik');

    await expect(page).toHaveURL(
      'http://localhost:3000/en/general-practitioner/'
    );
  });
});

// ITALIAN GP PAGE
describe('Italian gp page to /it/medico-di-famiglia/', () => {
  test('Should redirect /it/gp', async ({ page }) => {
    await page.goto('localhost:3000/it/gp');

    await expect(page).toHaveURL(
      'http://localhost:3000/it/medico-di-famiglia/'
    );
  });

  test('Should redirect /it/general-practitioner to /it/medico-di-famiglia/', async ({
    page,
  }) => {
    await page.goto('localhost:3000/it/general-practitioner');

    await expect(page).toHaveURL(
      'http://localhost:3000/it/medico-di-famiglia/'
    );
  });

  test('Should redirect /it/druzinski-zdravnik to /it/medico-di-famiglia/', async ({
    page,
  }) => {
    await page.goto('localhost:3000/it/druzinski-zdravnik');

    await expect(page).toHaveURL(
      'http://localhost:3000/it/medico-di-famiglia/'
    );
  });
});

// DENTIST PAGE
// SLOVENIAN DENTIST PAGE
describe('Slovenian den page', () => {
  test('Should redirect /sl/den to /sl/zobozdravnik', async ({ page }) => {
    await page.goto('localhost:3000/sl/den');

    await expect(page).toHaveURL('http://localhost:3000/sl/zobozdravnik/');
  });

  test('Should redirect /sl/dentist to /sl/zobozdravnik', async ({ page }) => {
    await page.goto('localhost:3000/sl/dentist');

    await expect(page).toHaveURL('http://localhost:3000/sl/zobozdravnik/');
  });

  test('Should redirect /sl/dentista to /sl/zobozdravnik', async ({ page }) => {
    await page.goto('localhost:3000/sl/dentista');

    await expect(page).toHaveURL('http://localhost:3000/sl/zobozdravnik/');
  });
});

// ENGLISH DENTIST PAGE
describe('English den page', () => {
  test('Should redirect /en/den to /en/dentist', async ({ page }) => {
    await page.goto('localhost:3000/en/den');

    await expect(page).toHaveURL('http://localhost:3000/en/dentist/');
  });

  test('Should redirect /en/zobozdravnik /en/dentist', async ({ page }) => {
    await page.goto('localhost:3000/en/zobozdravnik');

    await expect(page).toHaveURL('http://localhost:3000/en/dentist/');
  });

  test('Should redirect /en/dentista /en/dentist', async ({ page }) => {
    await page.goto('localhost:3000/en/dentista');

    await expect(page).toHaveURL('http://localhost:3000/en/dentist/');
  });
});

// ITALIAN DENTIST PAGE
describe('Italian den page', () => {
  test('Should redirect /it/den to /it/dentista', async ({ page }) => {
    await page.goto('localhost:3000/it/den');

    await expect(page).toHaveURL('http://localhost:3000/it/dentista/');
  });

  test('Should redirect /it/zobozdravnik to /it/dentista', async ({ page }) => {
    await page.goto('localhost:3000/it/zobozdravnik');

    await expect(page).toHaveURL('http://localhost:3000/it/dentista/');
  });

  test('Should redirect /it/dentist to /it/dentista', async ({ page }) => {
    await page.goto('localhost:3000/it/dentist');

    await expect(page).toHaveURL('http://localhost:3000/it/dentista/');
  });
});

// DENTIST YOUTH PAGE
// SLOVENIAN DENTIST YOUTH PAGE
describe('Slovenian den youth page', () => {
  test('Should redirect /sl/den-y to /sl/zobozdravnik-mladina', async ({
    page,
  }) => {
    await page.goto('localhost:3000/sl/den-y');

    await expect(page).toHaveURL(
      'http://localhost:3000/sl/zobozdravnik-mladina/'
    );
  });

  test('Should redirect /sl/dentist-youth to /sl/zobozdravnik-mladina', async ({
    page,
  }) => {
    await page.goto('localhost:3000/sl/dentist-youth');

    await expect(page).toHaveURL(
      'http://localhost:3000/sl/zobozdravnik-mladina/'
    );
  });

  test('Should redirect /sl/dentista-giovani to /sl/zobozdravnik-mladina', async ({
    page,
  }) => {
    await page.goto('localhost:3000/sl/dentista-giovani');

    await expect(page).toHaveURL(
      'http://localhost:3000/sl/zobozdravnik-mladina/'
    );
  });
});
