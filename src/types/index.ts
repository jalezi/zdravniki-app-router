import type { FC, SVGProps } from 'react';

import { IconName } from '@/components/icons';
import { AcceptsNewPatients, DoctorTypeCsv } from '@/lib/schemas';
import { Locales } from '@/locales/config';

export type BaseParams = {
  locale: Locales;
};

export type SVGComponent = FC<SVGProps<SVGSVGElement>>;

export type ExtracSuffix<T extends string> =
  T extends `${string}-${infer Suffix}` ? Suffix : never;

export type ExtractBase<T extends string> = T extends `${infer _}-${string}`
  ? never
  : T;

export type DoctorBaseType = ExtractBase<DoctorTypeCsv>;
export type DoctorSuffixType = ExtracSuffix<DoctorTypeCsv>;

export type DoctorIconsMap = Record<
  DoctorBaseType | DoctorSuffixType,
  { name: IconName; component: SVGComponent }
>;

export type AcceptsNewPatientsIconsMap = Record<
  AcceptsNewPatients,
  { name: IconName; component: SVGComponent }
>;
