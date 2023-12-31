import { Metadata } from 'next';
import { RedirectType, redirect } from 'next/navigation';

import { setStaticParamsLocale } from 'next-international/server';

import { DoctorTypeListSection as Section } from '@/components/cards';
import { Dialog } from '@/components/dialog';
import { doctorsQueryInputSchema } from '@/lib/schemas';
import {
  fetchAndParseDoctorsAndInstitutions,
  filters,
  getSiteUrl,
  toSlug,
} from '@/lib/utils';
import { getI18n, getScopedI18n, getStaticParams } from '@/locales/server';

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

const defaultsSearchParamsSchema = doctorsQueryInputSchema.default({
  type: 'all',
  page: 1,
  pageSize: 50,
});

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
    ...searchParams,
  });

  const parsedSearchParams = parsedParams.success
    ? parsedParams.data
    : defaultsSearchParamsSchema.parse({});

  const { paginatedDoctors, uniqueInstitutions, total } =
    filters.getPaginatedDoctorsWithUniqueInstitutions(
      doctors,
      institutions,
      parsedSearchParams
    );

  async function onClose() {
    'use server';
    if (parsedParams.success) {
      return;
    }
    const url = new URL('/', getSiteUrl());
    url.searchParams.set('type', 'all');
    url.searchParams.set('page', '1');
    url.searchParams.set('pageSize', '25');
    redirect(`/${locale}/${url.search}`, RedirectType.replace);
  }

  return (
    <main id='content' className='mx-auto mt-12 max-w-7xl px-4 py-4 md:mt-16'>
      <Dialog
        showModal={parsedParams.success ? undefined : true}
        close={onClose}
        closeTimeout={3000}
      >
        Invalid params
      </Dialog>
      <h1 className='sr-only'>{t('test')}</h1>
      <form action=''>
        <input
          type='text'
          name='type'
          id='type'
          list='types'
          defaultValue={parsedSearchParams.type}
        />
        <datalist id='types'>
          <option value='gp' />
          <option value='ped' />
          <option value='gyn' />
          <option value='den' />
          <option value='den-y' />
          <option value='den-s' />
        </datalist>
        <input
          type='number'
          name='page'
          id='page'
          min='1'
          defaultValue={parsedSearchParams.page}
        />
        <input
          type='number'
          name='pageSize'
          id='pageSize'
          min='25'
          max='50'
          defaultValue={parsedSearchParams.pageSize}
        />
        <input type='submit' value='Submit' />
      </form>
      <div className='flex flex-col gap-4'>
        <Section>
          <div>
            <h2>{t(`navLinks.home.label`)}</h2>
            <p>{total} doctors</p>
            <ul>
              {paginatedDoctors.map(doctor => {
                const doctorSlugify = toSlug(doctor.doctor);
                const doctorHref = `/${doctor.type}/${doctorSlugify}/${doctor.id_inst}/`;
                const inst = uniqueInstitutions.get(doctor.id_inst);
                return (
                  <li key={toSlug(doctor.doctor)}>
                    <a href={doctorHref}>{doctor.doctor} </a>
                    {inst ? <p>{inst.name}</p> : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </Section>
      </div>
    </main>
  );
}
