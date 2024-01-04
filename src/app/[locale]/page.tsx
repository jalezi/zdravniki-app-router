import { Metadata } from 'next';

import { setStaticParamsLocale } from 'next-international/server';

import { DoctorTypeListSection as Section } from '@/components/cards';
import MdxFooter from '@/components/footer/MdxFooter';
import { fetchAndParseDoctorsAndInstitutions, toSlug } from '@/lib/utils';
import { getInstitutionsMap, groupDoctorsByType } from '@/lib/utils/filters';
import { getI18n, getScopedI18n, getStaticParams } from '@/locales/server';

import { defaultsSearchParamsSchema } from './utils';

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
    ...searchParams,
  });

  const parsedSearchParams = parsedParams.success
    ? parsedParams.data
    : defaultsSearchParamsSchema.parse({});

  const doctorGroupsByType = groupDoctorsByType(doctors);
  const doctorsByType = doctorGroupsByType.get(parsedSearchParams.type) ?? [];
  const uniqueInstitutions = getInstitutionsMap(doctorsByType, institutions);

  return (
    <>
      <main id='content' className='mx-auto mt-12 max-w-7xl px-4 py-4 md:mt-16'>
        <h1 className='sr-only'>{t('test')}</h1>

        <div className='flex flex-col gap-4'>
          <Section>
            <div>
              <h2>{parsedSearchParams.type.toLocaleUpperCase()}</h2>
              <ul>
                {doctorsByType.map(doctor => {
                  const doctorSlugify = toSlug(doctor.doctor);
                  const doctorHref = `/${doctor.type}/${doctorSlugify}/${doctor.id_inst}/`;
                  const inst = uniqueInstitutions.get(doctor.id_inst);
                  return (
                    <li
                      key={
                        toSlug(doctor.doctor) +
                        '-' +
                        doctor.id_inst +
                        '-' +
                        doctor.type
                      }
                    >
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
      <MdxFooter />
    </>
  );
}
