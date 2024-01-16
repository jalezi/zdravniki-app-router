import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { setStaticParamsLocale } from 'next-international/server';

import { TIME } from '@/lib/constants';
import { doctorTypeParamSchema } from '@/lib/schemas';
import { LOCALES, Locales } from '@/locales/config';
import { getScopedI18n } from '@/locales/server';

import {
  ROUTEST_WITH_NESTED_ROUTES,
  ROUTES_TRANSLATIONS,
} from 'rewrites-redirects.config.mjs';

export const revalidate = TIME.ONE_HOUR_IN_SECONDS;

export async function generateStaticParams() {
  return LOCALES.flatMap(locale =>
    ROUTEST_WITH_NESTED_ROUTES.map(route => ({
      locale,
      doctorType: ROUTES_TRANSLATIONS['sl'][route],
    }))
  );
}

export async function generateMetadata({
  params,
}: DoctorsPageProps): Promise<Metadata> {
  const t = await getScopedI18n('seo');

  const safeDoctorType = doctorTypeParamSchema.safeParse(params.doctorType);

  if (!safeDoctorType.success) {
    return {
      title: t('title.pageNotFound'),
      description: t('description.pageNotFound'),
    };
  }

  const doctorType = safeDoctorType.data;

  return {
    title: t(`title.${doctorType}`),
    description: t(`description.${doctorType}`),
  };
}

type DoctorsPageProps = {
  params: {
    locale: Locales;
    doctorType: string;
  };
};

export default async function DoctorTypePage({ params }: DoctorsPageProps) {
  setStaticParamsLocale(params.locale);
  const t = await getScopedI18n('seo');

  const safeDoctorType = doctorTypeParamSchema.safeParse(params.doctorType);

  if (!safeDoctorType.success) {
    notFound();
  }

  const doctorType = safeDoctorType.data;

  const headerList = headers();
  const pathname = headerList.get('x-pathname');
  const canonicalPathname = headerList.get('x-canonical-pathname');

  return (
    <main id='content'>
      <h1>{t(`title.${doctorType}`)}</h1>
      <code>
        <pre>{JSON.stringify(params, null, 2)}</pre>
        <pre>{pathname}</pre>
        <pre>{canonicalPathname}</pre>
      </code>
    </main>
  );
}
