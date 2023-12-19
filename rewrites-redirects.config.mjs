export const LOCALE_NAMES = {
  sl: 'Slovenščina',
  en: 'English',
  it: 'Italiano',
};

export const SL_SEGMENTS_TRANSLATIONS = {
  faq: 'pogosta-vprasanja',
  about: 'o-projektu',
  gp: 'druzinski-zdravnik',
  ped: 'pediater',
  gyn: 'ginekolog',
  den: 'zobozdravnik',
  'den-y': 'zobozdravnik-mladina',
  'den-s': 'zobozdravnik-studenti',
};

export const EN_SEGMENTS_TRANSLATIONS = {
  faq: 'faq',
  about: 'about',
  gp: 'general-practitioner',
  ped: 'pediatrician',
  gyn: 'gynecologist',
  den: 'dentist',
  'den-y': 'dentist-youth',
  'den-s': 'dentist-students',
};

export const IT_SEGMENTS_TRANSLATIONS = {
  faq: 'domande-frequenti',
  about: 'il-progetto',
  gp: 'medico-di-famiglia',
  ped: 'pediatra',
  gyn: 'ginecologo',
  den: 'dentista',
  'den-y': 'dentista-giovani',
  'den-s': 'dentista-studenti',
};

export const SEGMENTS_TRANSLATIONS = {
  sl: SL_SEGMENTS_TRANSLATIONS,
  en: EN_SEGMENTS_TRANSLATIONS,
  it: IT_SEGMENTS_TRANSLATIONS,
};

export const I18N_CONFIG = {
  locales: ['en', 'it', 'sl'],
  defaultLocale: 'sl',
};

// not counting locale first level segments
export const SEGMENTS = [
  'faq',
  'about',
  'gp',
  'ped',
  'gyn',
  'den',
  'den-y',
  'den-s',
];

// not counting locale first level segments with same folder name
export const CANONICAL_SEGMENTS = ['faq', 'about'];

// not counting locale first level segments with [doctorType] folder name
export const NOT_CANONICAL_SEGMENTS = SEGMENTS.filter(
  p => !CANONICAL_SEGMENTS.includes(p)
);

// not counting locale first level segments with nested segments with segments /[slugName]/[idInst]
export const SEGMENTS_WITH_NESTED_SEGMENTS = [
  'gp',
  'ped',
  'gyn',
  'den',
  'den-y',
  'den-s',
];

const rewritePathname = (pathname, locale) => {
  const localePathname = SEGMENTS_TRANSLATIONS[locale][pathname];

  const rewrite = {
    source: `/${locale}/${localePathname}`,
    destination: `/${locale}/${pathname}`,
  };

  const nestedRewrite = SEGMENTS_WITH_NESTED_SEGMENTS.includes(pathname)
    ? {
        source: `/${locale}/${localePathname}/:slugName/:idInst`,
        destination: `/${locale}/${pathname}/:slugName/:idInst`,
      }
    : null;

  if (rewrite.source === rewrite.destination) return null;
  return [rewrite, nestedRewrite];
};

/**
 * Rewrites are used to rewrite URLs to the correct page. For example,
 * if a user goes to /sl/pogosta-vprasanja, server will return page for /sl/faq.
 * This is done so that we have only one logic for each page.
 * @see https://nextjs.org/docs/api-reference/next.config.js/rewrites
 * @example /en/general-practitioner -> /en/gp
 */
export const REWRITES = I18N_CONFIG.locales
  .flatMap(locale =>
    SEGMENTS.flatMap(pathname => {
      return rewritePathname(pathname, locale);
    }).filter(Boolean)
  )
  .filter(
    (obj, index, arr) =>
      obj !== null &&
      arr.findIndex(
        o => o?.source === obj?.source && o?.destination === obj?.destination
      ) === index
  );

export const redirectPathname = (pathname, otherLocalePathname, locale) => {
  const localePathname = SEGMENTS_TRANSLATIONS[locale][pathname];

  const redirect = {
    source: `/${locale}/${otherLocalePathname}`,
    destination: `/${locale}/${localePathname}`,
    permanent: true,
  };

  const nestedRedirect = SEGMENTS_WITH_NESTED_SEGMENTS.includes(pathname)
    ? {
        source: `/${locale}/${otherLocalePathname}/:slugName/:idInst`,
        destination: `/${locale}/${localePathname}/:slugName/:idInst`,
        permanent: true,
      }
    : null;

  if (redirect.source === redirect.destination) return null;
  return [redirect, nestedRedirect];
};

/**
 * @example /en/gp -> /en/general-practitioner
 * @example /en/gp/:slugName/:idInst -> /en/general-practitioner/:slugName/:idInst
 */
const NOT_CANONICAL_REDIRECTS = Object.entries(SEGMENTS_TRANSLATIONS)
  .flatMap(([locale, paths]) => {
    return Object.entries(paths).flatMap(([pathname, localePathname]) => {
      return CANONICAL_SEGMENTS.includes(pathname)
        ? null
        : [
            {
              source: `/${locale}/${pathname}`,
              destination: `/${locale}/${localePathname}`,
              permanent: true,
            },

            {
              source: `/${locale}/${pathname}/:slugName/:idInst`,
              destination: `/${locale}/${localePathname}/:slugName/:idInst`,
              permanent: true,
            },
          ];
    });
  })
  .filter(Boolean);

/**
 * Redirects are used to redirect users from the other language to the
 * current language. For example, if a user is on /sl/faq, they will be
 * redirected to /sl/pogosta-vprasanja.
 * @example /sl/general-practitioner -> /sl/druzinski-zdravnik
 */
export const REDIRECTS = I18N_CONFIG.locales
  .flatMap(locale => {
    const otherLocales = I18N_CONFIG.locales.filter(l => l !== locale);
    return SEGMENTS.flatMap(pathname => {
      return otherLocales
        .flatMap(otherLocale => {
          const otherLocalePathname =
            SEGMENTS_TRANSLATIONS[otherLocale][pathname];
          return redirectPathname(pathname, otherLocalePathname, locale);
        })
        .filter(Boolean);
    });
  })
  .concat(NOT_CANONICAL_REDIRECTS)
  .filter(
    (obj, index, arr) =>
      obj !== null &&
      arr.findIndex(
        o => o?.source === obj?.source && o?.destination === obj?.destination
      ) === index
  );
