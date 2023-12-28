import slugify from 'slugify';

import { Locales } from '@/locales/config';

type SlugOptions = {
  replacement?: string;
  remove?: RegExp;
  lower?: boolean;
  strict?: boolean;
  locale?: string;
  trim?: boolean;
};

export const toSlug = function toSlug(
  text = '',
  options: SlugOptions = { lower: true, remove: /[*+~.()'"!:@]/g, trim: true }
) {
  return slugify(text, options);
};

const createToSlugLocale = (locale?: Locales, options?: SlugOptions) => {
  const _options = options ?? {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    locale: locale ?? undefined,
    trim: true,
  };

  return (text: string) => toSlug(text, _options);
};

export const toSlugLocale = {
  sl: createToSlugLocale('sl'),
  en: createToSlugLocale('en'),
  it: createToSlugLocale('it'),
};
