import fs from 'node:fs/promises';
import path from 'node:path';

import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { getPlaiceholder } from 'plaiceholder';

import notFoundImage from '@/assets/images/not-found.webp';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';

import { ROUTES_TRANSLATIONS } from '../../../../../rewrites-redirects.config.mjs';

const baseBasePath = path.join(process.cwd(), 'src', 'assets', 'images');
const filePath = path.join(baseBasePath, 'not-found.webp');
const file = await fs.readFile(filePath);

export default async function NotFound() {
  const t = await getScopedI18n('seo');
  const tNotFound = await getScopedI18n('notFound');

  const data = await getPlaiceholder(file);

  const locale = getCurrentLocale();
  const headersList = headers();
  const pathname = headersList.get('x-pathname');

  const title = t('title.pageNotFound');

  const possibleSegments = ROUTES_TRANSLATIONS[locale];

  return (
    <main className='relative mx-auto flex min-h-[calc(100dvh-3rem)] w-screen md:min-h-[calc(100dvh-4rem)]'>
      <div className='relative z-10 flex grow flex-col items-center justify-center bg-white/90 px-8 py-16'>
        <h1 className='mb-8 text-3xl font-semibold'>{title}</h1>
        <p className='mb-8'>{tNotFound('somethingWentWrong')}</p>
        <div className='flex flex-col gap-2 '>
          <p>
            {tNotFound('resourceNotFound')}:{' '}
            <span className='rounded-md bg-text-50 px-2 py-1 font-medium'>
              {pathname}
            </span>
          </p>
          <p>{tNotFound('possibleSegments')}: </p>
          <ul className='flex flex-col gap-2 px-4'>
            {Object.values(possibleSegments).map(segment => (
              <li key={segment}>
                <Link
                  href={`/${segment}`}
                  className='rounded-md bg-text-50 px-2 py-1 font-medium hover:opacity-70'
                >
                  /{locale}/{segment}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='absolute bottom-0  left-0 top-0 h-full w-full'>
        <Image
          src={notFoundImage}
          alt={title}
          fill
          priority
          className='-z-10  object-contain pt-4'
          sizes='(max-width: 500px) 100vw, (max-width: 1024px) 50vw, 33vw'
          placeholder='blur'
          blurDataURL={data.base64}
        />
      </div>
    </main>
  );
}
