import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import notFoundImage from '@/assets/images/doctor-404@2x.png';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';

import { SEGMENTS_TRANSLATIONS } from '../../../../../rewrites-redirects.config.mjs';

export default async function NotFound() {
  const t = await getScopedI18n('seo');
  const tNotFound = await getScopedI18n('notFound');

  const locale = getCurrentLocale();
  const headersList = headers();
  const nextUrl = headersList.get('next-url');

  const title = t('title.pageNotFound');

  const possibleSegments = SEGMENTS_TRANSLATIONS[locale];

  return (
    <main className='relative mx-auto grid h-full w-screen place-items-center'>
      <div className='relative px-8 py-16 '>
        <h1 className='mb-8 text-3xl font-semibold'>{title}</h1>
        <div className='h-30 relative mx-auto h-auto w-40'>
          <Image src={notFoundImage} alt={title} height={500} width={500} />
        </div>
        <div className='flex flex-col gap-2'>
          <p>
            {tNotFound('resourceNotFound')}:{' '}
            <span className='rounded-md bg-text-50 px-2 py-1'>{nextUrl}</span>
          </p>
          <p>{tNotFound('possibleSegments')}: </p>
          <ul className='flex flex-col gap-2 px-4'>
            {Object.values(possibleSegments).map(segment => (
              <li key={segment}>
                <Link
                  href={`/${segment}`}
                  className='rounded-md bg-text-50 px-2 py-1 hover:opacity-70'
                >
                  /{locale}/{segment}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
