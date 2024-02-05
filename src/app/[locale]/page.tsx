import { Suspense } from 'react';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { setStaticParamsLocale } from 'next-international/server';

import MdxFooter from '@/components/footer/MdxFooter';
import { Search } from '@/components/search';
import { TIME } from '@/lib/constants';
import { fetchAndParseDoctorsAndInstitutions } from '@/lib/utils';
import { groupAndFilterDoctorsByType } from '@/lib/utils/filters';
import { getI18n, getScopedI18n, getStaticParams } from '@/locales/server';

import DoctorsList from './(doctor-types)/[doctorType]/DoctorsList';
import { defaultsSearchParamsSchema } from './utils';

const DoctorListSkeleton = dynamic(
  () => import('./(doctor-types)/[doctorType]/DoctorListSkeleton')
);
const Pagination = dynamic(
  () => import('../../components/pagination/Pagination')
);
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
    query: searchParams.query,
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
        <form className='mb-2'>
          <Search />
        </form>

        <section
          className='flex flex-col gap-4'
          aria-label={`${parsedSearchParams.type}, page: ${parsedSearchParams.page}`}
        >
          {pagination}

          <ul className='grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
            <Suspense
              key={parsedSearchParams.toString()}
              fallback={
                <DoctorListSkeleton length={+parsedSearchParams.pageSize} />
              }
            >
              <DoctorsList
                type={parsedSearchParams.type}
                page={parsedSearchParams.page}
                pageSize={parsedSearchParams.pageSize}
                accepts={parsedSearchParams.accepts}
                query={parsedSearchParams.query}
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
