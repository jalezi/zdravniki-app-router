import { headers } from 'next/headers';

import { Locales } from '@/locales/config';

type DoctorsPageProps = {
  params: {
    locale: Locales;
    doctorType: string;
  };
};

export default function DoctorsPage({ params }: DoctorsPageProps) {
  const headerList = headers();
  const pathname = headerList.get('x-pathname');
  const canonicalPathname = headerList.get('x-canonical-pathname');

  return (
    <main id='content'>
      <h1>Doctor&apos;s Page</h1>
      <code>
        <pre>{JSON.stringify(params, null, 2)}</pre>
        <pre>{pathname}</pre>
        <pre>{canonicalPathname}</pre>
      </code>
    </main>
  );
}
