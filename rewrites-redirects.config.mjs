/**
 * @typedef {Object} I18NConfig
 * @property {["en", "it", "sl"]} locales
 * @property {"sl"} defaultLocale
 */

/**
 * @typedef {['faq','about','gp','ped','gyn','den','den-y','den-s',]} Routes
 */

/**
 * @typedef {['faq', 'about' ]} StaticRoutes
 */

/**
 * @typedef {[ 'gp', 'ped', 'gyn', 'den', 'den-y', 'den-s' ]} DynamicRoutes
 */

/**
 * @typedef {['gp', 'ped', 'gyn', 'den', 'den-y', 'den-s']} NestedRoutes
 */

/**
 * @typedef {Record<Routes[number], string} RouteTranslation
 */

/**
 * @typedef {Record<Routes[number], string[]} RouteTranslations
 */

export const LOCALE_NAMES = {
  sl: 'Slovenščina',
  en: 'English',
  it: 'Italiano',
};

/**
 * @type {RouteTranslation>}
 */
export const SL_ROUTES = {
  faq: 'pogosta-vprasanja',
  about: 'o-projektu',
  gp: 'druzinski-zdravnik',
  ped: 'pediater',
  gyn: 'ginekolog',
  den: 'zobozdravnik',
  'den-y': 'zobozdravnik-mladina',
  'den-s': 'zobozdravnik-studenti',
};

/**
 * @type {RouteTranslation}
 */
export const EN_ROUTES = {
  faq: 'faq',
  about: 'about',
  gp: 'general-practitioner',
  ped: 'pediatrician',
  gyn: 'gynecologist',
  den: 'dentist',
  'den-y': 'dentist-youth',
  'den-s': 'dentist-students',
};

/**
 * @type {RouteTranslation}
 */
export const IT_ROUTES = {
  faq: 'domande-frequenti',
  about: 'il-progetto',
  gp: 'medico-di-famiglia',
  ped: 'pediatra',
  gyn: 'ginecologo',
  den: 'dentista',
  'den-y': 'dentista-giovani',
  'den-s': 'dentista-studenti',
};

export const ROUTES_TRANSLATIONS = {
  sl: SL_ROUTES,
  en: EN_ROUTES,
  it: IT_ROUTES,
};

/**
 * @type {I18NConfig}
 */
export const I18N_CONFIG = {
  locales: ['en', 'it', 'sl'],
  defaultLocale: 'sl',
};

// not counting locale first level segments
/**
 * @type {Routes}
 */
export const ROUTES = [
  'faq',
  'about',
  'gp',
  'ped',
  'gyn',
  'den',
  'den-y',
  'den-s',
];

/**
 * @type {RouteTranslations}
 *
 */
const _ROUTE_TRANSLATIONS_LISTS_ACC = {};

export const ROUTE_TRANSLATIONS_LISTS = ROUTES.reduce((acc, route) => {
  acc[route] = [EN_ROUTES[route], SL_ROUTES[route], IT_ROUTES[route]];
  return acc;
}, _ROUTE_TRANSLATIONS_LISTS_ACC);

// not counting locale first level segments with same folder name
/**
 * @type {StaticRoutes}
 */
export const STATIC_ROUTES = ['faq', 'about'];

// not counting locale first level segments with [doctorType] folder name
/**
 * @type {DynamicRoutes}
 */
export const DYNAMIC_ROUTES = ROUTES.filter(p => !STATIC_ROUTES.includes(p));

// not counting locale first level segments with nested segments with segments /[slugName]/[idInst]
/**
 * @type {NestedRoutes}
 * @example /en/gp/:slugName/:idInst
 */
export const ROUTEST_WITH_NESTED_ROUTES = [
  'gp',
  'ped',
  'gyn',
  'den',
  'den-y',
  'den-s',
];

const rewritePathname = (pathname, locale) => {
  const localePathname = ROUTES_TRANSLATIONS[locale][pathname];

  const rewrite = {
    source: `/${locale}/${localePathname}`,
    destination: `/${locale}/${pathname}`,
  };

  const nestedRewrite = ROUTEST_WITH_NESTED_ROUTES.includes(pathname)
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
    ROUTES.flatMap(pathname => {
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
  const localePathname = ROUTES_TRANSLATIONS[locale][pathname];

  const redirect = {
    source: `/${locale}/${otherLocalePathname}`,
    destination: `/${locale}/${localePathname}`,
    permanent: true,
  };

  const nestedRedirect = ROUTEST_WITH_NESTED_ROUTES.includes(pathname)
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
const NOT_CANONICAL_REDIRECTS = Object.entries(ROUTES_TRANSLATIONS)
  .flatMap(([locale, paths]) => {
    return Object.entries(paths).flatMap(([pathname, localePathname]) => {
      return STATIC_ROUTES.includes(pathname)
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
    return ROUTES.flatMap(pathname => {
      return otherLocales
        .flatMap(otherLocale => {
          const otherLocalePathname =
            ROUTES_TRANSLATIONS[otherLocale][pathname];
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
