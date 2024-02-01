import { Suspense } from 'react';

import { Metadata } from 'next';

import { setStaticParamsLocale } from 'next-international/server';

import MdxFooter from '@/components/footer/MdxFooter';
import Pagination from '@/components/pagination/Pagination';
import { TIME } from '@/lib/constants';
import { fetchAndParseDoctorsAndInstitutions } from '@/lib/utils';
import { groupAndFilterDoctorsByType } from '@/lib/utils/filters';
import { getI18n, getScopedI18n, getStaticParams } from '@/locales/server';

import DoctorListSkeleton from './(doctor-types)/[doctorType]/DoctorListSkeleton';
import DoctorsList from './(doctor-types)/[doctorType]/DoctorsList';
import Form from './form';
import { defaultsSearchParamsSchema } from './utils';

export const revalidate = TIME.ONE_HOUR_IN_SECONDS;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('seo');

  return {
    title: `${t('title.default')} - Zdravniki Sledilnik`,
    description: t('description.default'),
  };
}

export function generateStaticParams() {
  return getStaticParams();
}

export default async function Home({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: Record<string, string>;
}) {
  setStaticParamsLocale(locale);
  const t = await getI18n();

  const { data, errors, success } = await fetchAndParseDoctorsAndInstitutions();

  if (!success || !data || !data.doctors || !data.institutions) {
    console.log(errors);
    throw new Error('Failed to fetch doctors and institutions');
  }

  const { doctors } = data;

  const parsedParams = defaultsSearchParamsSchema.safeParse({
    type: searchParams.type,
    page: searchParams.page,
    pageSize: searchParams.pageSize,
    accepts: searchParams.accepts,
  });

  const parsedSearchParams = parsedParams.success
    ? parsedParams.data
    : defaultsSearchParamsSchema.parse({});

  const doctorGroupsByType = groupAndFilterDoctorsByType(doctors, {
    accepts: parsedSearchParams.accepts,
  });

  const lengths = {
    all: doctorGroupsByType.get('all')?.length ?? 0,
    gp: doctorGroupsByType.get('gp')?.length ?? 0,
    ped: doctorGroupsByType.get('ped')?.length ?? 0,
    gyn: doctorGroupsByType.get('gyn')?.length ?? 0,
    den: doctorGroupsByType.get('den')?.length ?? 0,
    'den-y': doctorGroupsByType.get('den-y')?.length ?? 0,
    'den-s': doctorGroupsByType.get('den-s')?.length ?? 0,
  } as const;

  const pagination = (
    <div className='flex flex-wrap items-center gap-1 self-center'>
      <Pagination length={lengths[parsedSearchParams.type]} />
    </div>
  );
  // todo - better aria-label for section
  return (
    <>
      <main id='content' className='mx-auto mt-12 max-w-7xl px-4 py-4 md:mt-16'>
        <h1 className='sr-only'>{t('test')}</h1>
        <Form lengths={lengths} {...parsedSearchParams} />

        <section
          className='flex flex-col gap-4'
          aria-label={`${parsedSearchParams.type}, page: ${parsedSearchParams.page}`}
        >
          {pagination}

          <ul className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
            <Suspense
              key={searchParams.toString()}
              fallback={
                <DoctorListSkeleton length={+parsedSearchParams.pageSize} />
              }
            >
              <DoctorsList
                type={searchParams.type ?? 'all'}
                page={searchParams.page ?? '1'}
                pageSize={searchParams.pageSize ?? '12'}
                accepts={searchParams.accepts ?? 'all'}
              />
            </Suspense>
          </ul>
          {pagination}
        </section>
      </main>
      <MdxFooter />
    </>
  );
}
