import { Suspense } from 'react';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { setStaticParamsLocale } from 'next-international/server';

import MdxFooter from '@/components/footer/MdxFooter';
import { SearchForm } from '@/components/search';
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

  const { doctors, institutions } = data;

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

  const doctorGroupsByType = groupAndFilterDoctorsByType(
    doctors,
    institutions,
    {
      accepts: parsedSearchParams.accepts,
      query: parsedSearchParams.query,
    }
  );

  const length = doctorGroupsByType.get(parsedSearchParams.type)?.length ?? 0;

  const pagination = (
    <div className='flex flex-wrap items-center gap-1 self-center'>
      <Pagination length={length} />
    </div>
  );
  // todo - better aria-label for section
  return (
    <>
      <main
        id='content'
        className='mx-auto mt-12 min-h-[calc(100dvh-3rem-25.875rem)] max-w-7xl  px-4 pb-4 md:mt-16 md:min-h-[calc(100dvh-4rem-25.875rem)] '
      >
        <h1 className='sr-only'>{t('test')}</h1>
        <SearchForm />

        <section
          className='flex flex-col gap-4'
          aria-label={`${parsedSearchParams.type}, page: ${parsedSearchParams.page}`}
        >
          {length > 0 ? (
            pagination
          ) : (
            <div className='grid place-items-center py-10'>
              Refine your search
            </div>
          )}

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
          {length > 0 ? pagination : null}
        </section>
      </main>
      <MdxFooter />
    </>
  );
}
