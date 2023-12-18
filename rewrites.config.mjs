export const LOCALE_NAMES = {
  sl: 'Slovenščina',
  en: 'English',
  it: 'Italiano',
};

export const I18N_CONFIG = {
  locales: ['en', 'it', 'sl'],
  defaultLocale: 'sl',
};

export const CANONICAL_PATHS = [
  'faq',
  'about',
  'gp',
  'ped',
  'gyn',
  'den',
  'den-y',
  'den-s',
];

export const SL_PATHS = {
  faq: 'pogosta-vprasanja',
  about: 'o-projektu',
  gp: 'druzinski-zdravnik',
  ped: 'pediater',
  gyn: 'ginekolog',
  den: 'zobozdravnik',
  'den-y': 'zobozdravnik-mladina',
  'den-s': 'zobozdravnik-studenti',
};

export const EN_PATHS = {
  faq: 'faq',
  about: 'about',
  gp: 'general-practitioner',
  ped: 'pediatrician',
  gyn: 'gynecologist',
  den: 'dentist',
  'den-y': 'dentist-youth',
  'den-s': 'dentist-students',
};

export const IT_PATHS = {
  faq: 'faq',
  about: 'about',
  gp: 'medico-di-famiglia',
  ped: 'pediatra',
  gyn: 'ginecologo',
  den: 'dentista',
  'den-y': 'dentista-giovani',
  'den-s': 'dentista-studenti',
};

export const LOCALE_PATHS = {
  sl: SL_PATHS,
  en: EN_PATHS,
  it: IT_PATHS,
};

const rewritePathname = (pathname, locale) => {
  const localePathname = LOCALE_PATHS[locale][pathname];

  const rewrite = {
    source: `/${locale}/${localePathname}`,
    destination: `/${locale}/${pathname}`,
  };

  if (rewrite.source === rewrite.destination) return null;
  return rewrite;
};

/**
 * Rewrites are used to rewrite URLs to the correct page. For example,
 * if a user goes to /sl/pogosta-vprasanja, server will return page for /sl/faq.
 * This is done so that we have only one logic for each page.
 */
export const REWRITES = I18N_CONFIG.locales.flatMap(locale =>
  CANONICAL_PATHS.map(pathname => {
    return rewritePathname(pathname, locale);
  }).filter(Boolean)
);

export const redirectPathname = (pathname, otherLocalePathname, locale) => {
  const localePathname = LOCALE_PATHS[locale][pathname];

  const redirect = {
    source: `/${locale}/${otherLocalePathname}`,
    destination: `/${locale}/${localePathname}`,
    permanent: true,
  };

  if (redirect.source === redirect.destination) return null;
  return redirect;
};

/**
 * Redirects are used to redirect users from the other language to the
 * current language. For example, if a user is on /sl/faq, they will be
 * redirected to /sl/pogosta-vprasanja.
 */
export const REDIRECTS = I18N_CONFIG.locales.flatMap(locale => {
  const otherLocales = I18N_CONFIG.locales.filter(l => l !== locale);
  return CANONICAL_PATHS.map(pathname => {
    return otherLocales
      .map(otherLocale => {
        const otherLocalePathname = LOCALE_PATHS[otherLocale][pathname];
        return redirectPathname(pathname, otherLocalePathname, locale);
      })
      .filter(Boolean);
  }).flat();
});
