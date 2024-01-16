import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { setStaticParamsLocale } from 'next-international/server';

import { TIME } from '@/lib/constants';
import { DoctorsCsv } from '@/lib/schemas';
import { toSlug, fetchAndParseDoctorsAndInstitutions } from '@/lib/utils';
import { Locales } from '@/locales/config';

export const revalidate = TIME.ONE_HOUR_IN_SECONDS;

type PersonalDoctorPageProps = {
  params: {
    locale: Locales;
    doctorType: string;
    slugName: string;
    idInst: string;
  };
};

export default async function PersonalDoctorPage({
  params,
}: PersonalDoctorPageProps) {
  setStaticParamsLocale(params.locale);

  const headerList = headers();
  const pathname = headerList.get('x-pathname');
  const canonicalPathname = headerList.get('x-canonical-pathname');

  const { data, errors } = await fetchAndParseDoctorsAndInstitutions();

  const { doctorType, slugName, idInst } = params;

  const doctors: DoctorsCsv[] =
    data?.doctors && data?.institutions && !errors
      ? data?.doctors?.filter(
          doctor =>
            doctor.type === doctorType &&
            toSlug(doctor.doctor) === slugName &&
            doctor.id_inst === idInst
        )
      : [];

  if (doctors.length === 0) {
    return notFound();
  }

  if (doctors.length > 1) {
    console.warn("There's more than one doctor with the same name and id_inst");
  }

  const doctor = doctors[0];

  const institution = data?.institutions?.find(
    institution => institution.id_inst === idInst
  );

  if (!doctor || !institution) {
    return notFound();
  }

  return (
    <main id='content'>
      <h1>{doctor.doctor}</h1>
      <code>
        <pre>{JSON.stringify(params, null, 2)}</pre>
        <pre>{JSON.stringify({ pathname }, null, 2)}</pre>
        <pre>{JSON.stringify({ canonicalPathname }, null, 2)}</pre>
        <pre>{JSON.stringify(doctor, null, 2)}</pre>
        <pre>{JSON.stringify(institution, null, 2)}</pre>
      </code>
    </main>
  );
}
