import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { setStaticParamsLocale } from 'next-international/server';

import MdxFooter from '@/components/footer/MdxFooter';
import Pagination from '@/components/pagination/Pagination';
import { TIME } from '@/lib/constants';
import { doctorsCsvSchema } from '@/lib/schemas';
import {
  doctorUtils,
  fetchAndParseDoctorsAndInstitutions,
  getStartAndEnd,
} from '@/lib/utils';
import { getInstitutionsMap, groupDoctorsByType } from '@/lib/utils/filters';
import { getI18n, getScopedI18n, getStaticParams } from '@/locales/server';

import Form from './form';
import { defaultsSearchParamsSchema, redirectWithSearchParams } from './utils';

const DoctorCard = dynamic(() => import('@/components/cards/DoctorCard'));

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
  });

  const parsedSearchParams = parsedParams.success
    ? parsedParams.data
    : defaultsSearchParamsSchema.parse({});

  const doctorGroupsByType = groupDoctorsByType(doctors);
  const doctorsByType = doctorGroupsByType.get(parsedSearchParams.type) ?? [];

  const length = doctorsByType.length;
  const maxPage = Math.floor(length / +parsedSearchParams.pageSize) + 1;

  if (+parsedSearchParams.page > maxPage || !parsedParams.success) {
    if (+parsedSearchParams.page > maxPage) {
      console.warn("Page doesn't exist, redirecting to last page");
      parsedSearchParams.page = maxPage;
    }

    if (!parsedParams.success) {
      console.warn('Invalid params, redirecting to default params');
    }

    redirectWithSearchParams(parsedSearchParams, locale);
    return null;
  }

  const { start, end } = getStartAndEnd(
    parsedSearchParams.page,
    +parsedSearchParams.pageSize
  );

  const filteredDoctors = doctorsByType.slice(start, end);
  const uniqueInstitutions = getInstitutionsMap(filteredDoctors, institutions);

  const lengths = {
    all: doctors.length,
    gp: doctorGroupsByType.get('gp')?.length ?? 0,
    ped: doctorGroupsByType.get('ped')?.length ?? 0,
    gyn: doctorGroupsByType.get('gyn')?.length ?? 0,
    den: doctorGroupsByType.get('den')?.length ?? 0,
    'den-y': doctorGroupsByType.get('den-y')?.length ?? 0,
    'den-s': doctorGroupsByType.get('den-s')?.length ?? 0,
  } as const;

  const pagination = (
    <Pagination
      length={lengths[parsedSearchParams.type]}
      page={parsedSearchParams.page}
      pageSize={+parsedSearchParams.pageSize}
      doctorType={parsedSearchParams.type}
      className='self-center'
    />
  );

  return (
    <>
      <main id='content' className='mx-auto mt-12 max-w-7xl px-4 py-4 md:mt-16'>
        <h1 className='sr-only'>{t('test')}</h1>
        <Form lengths={lengths} {...parsedSearchParams} />

        <section className='flex flex-col gap-4'>
          {pagination}
          <ul className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
            {filteredDoctors.map(doctor => {
              const safeDoctor = doctorsCsvSchema.safeParse(doctor);

              if (!safeDoctor.success) {
                return null;
              }

              const props = doctorUtils.getDoctor(
                safeDoctor.data,
                uniqueInstitutions
              );

              if (!props) {
                return null; // TODO handle this later
              }

              const { key, ...drProps } = props;

              return (
                <li key={key}>
                  <DoctorCard {...drProps} />
                </li>
              );
            })}
          </ul>
          {pagination}
        </section>
      </main>
      <MdxFooter />
    </>
  );
}
