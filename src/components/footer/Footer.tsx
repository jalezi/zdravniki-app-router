import { HTMLAttributes } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { LongDate } from '@/components/long-date';
import { DOCTORS_TS_URL } from '@/lib/constants/url';
import { getTimestamp } from '@/lib/get-timestamp';
import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

const footerVariants = cva(
  'footer bg-[#f4f8f8] text-xs flex items-center  w-full px-4 py-4 md:px-0',
  {
    variants: {
      variant: {
        mdx: ' ',
        list: '',
      },
    },
    defaultVariants: {
      variant: 'mdx',
    },
  }
);

export interface FooterProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerVariants> {}

export default async function Footer({
  className,
  variant,
  ...props
}: FooterProps) {
  const timestamp = await getTimestamp(DOCTORS_TS_URL);
  const tFooter = await getScopedI18n('footer');
  const tTimestamp = await getScopedI18n('timestamp');

  return (
    <footer className={cn(footerVariants({ variant, className }))} {...props}>
      <div className='footer-content-wrapper'>
        <p className='not-prose'>
          {tFooter('dataSource')}:{' '}
          <a
            className='not-prose'
            href='https://www.zzzs.si'
            target='_blank'
            rel='noreferrer'
          >
            <abbr title={tFooter('zzzs')}>ZZZS</abbr>
          </a>
          ,{' '}
          <a
            href='https://www.gov.si/drzavni-organi/organi-v-sestavi/geodetska-uprava/'
            target='_blank'
            rel='noreferrer'
          >
            <abbr title={tFooter('gurs')}>GURS</abbr>
          </a>
        </p>
        <p className='not-prose'>
          {tFooter('lastChange')}:{' '}
          <strong>
            <LongDate
              timestamp={timestamp.data}
              timeDesignator={tTimestamp('at')}
              noData={tTimestamp('noData')}
              className='whitespace-nowrap'
            />
          </strong>
        </p>
        <p className='not-prose'>
          © 2021-
          {new Date().getFullYear()} <strong>Sledilnik.org</strong>
        </p>
      </div>
    </footer>
  );
}
