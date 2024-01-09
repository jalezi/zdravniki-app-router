import type { FC, SVGProps } from 'react';

import { Locales } from '@/locales/config';

export type BaseParams = {
  locale: Locales;
};

export type SVGComponent = FC<SVGProps<SVGSVGElement>>;
