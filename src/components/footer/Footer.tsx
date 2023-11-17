import { HTMLAttributes } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { LongDate } from '@/components/long-date';
import { DOCTORS_TS_URL } from '@/lib/constants/url';
import { getTimestamp } from '@/lib/get-timestamp';
import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

const footerVariants = cva(
  'footer text-xs flex items-center max-w-3xl mx-auto px-4 py-4 md:px-0',
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
  const t = await getScopedI18n('footer');
  const dataSource = t('dataSource');
  const lastChange = t('lastChange');
  const zzzs = t('zzzs');
  const gurs = t('gurs');
  return (
    <footer className={cn(footerVariants({ variant, className }))} {...props}>
      <div className='footer-content-wrapper'>
        <p className='not-prose'>
          {dataSource}:{' '}
          <a
            className='not-prose'
            href='https://www.zzzs.si'
            target='_blank'
            rel='noreferrer'
          >
            <abbr title={zzzs}>ZZZS</abbr>
          </a>
          ,{' '}
          <a
            href='https://www.gov.si/drzavni-organi/organi-v-sestavi/geodetska-uprava/'
            target='_blank'
            rel='noreferrer'
          >
            <abbr title={gurs}>GURS</abbr>
          </a>
        </p>
        <p className='not-prose'>
          {lastChange}:{' '}
          <strong className='whitespace-nowrap'>
            <LongDate timestamp={timestamp.data} />
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
