import { ReactNode } from 'react';

import { AlertCircle } from 'lucide-react';

import { Footer } from '@/components/footer';
import { MdxNav } from '@/components/mdx-nav';
import { getScopedI18n } from '@/locales/server';

export default async function MdxLayout({ children }: { children: ReactNode }) {
  const t = await getScopedI18n('mdx');

  return (
    <>
      <div id='mdx-page-wrapper' className='mdx-page-wrapper'>
        <div className='mdx-aside-wrapper'>
          <aside className='sticky left-0 right-0 top-16 w-full md:mt-4'>
            <MdxNav />
          </aside>
        </div>
        <div id='mdx-main-wrapper' className='mdx-main-wrapper '>
          <main className='grid place-items-center'>
            <div className='prose prose-sm mx-4 mt-4 pb-4 prose-a:transition-all prose-a:duration-367 prose-li:marker:text-inherit '>
              <p className='mb-7 flex gap-2 bg-red-50 px-4 py-2 font-semibold'>
                <AlertCircle />
                {t('emergencyInfo')}
              </p>
              <article>{children}</article>
            </div>
          </main>
        </div>
      </div>
      <div
        id='footer-wrapper'
        className='footer-wrapper border-t border-dashed border-text-200'
      >
        <Footer variant='mdx' />
      </div>
    </>
  );
}
