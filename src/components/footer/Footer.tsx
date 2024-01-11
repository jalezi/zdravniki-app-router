import { HTMLAttributes } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

import Timestamp from '../timestamp/Timestamp';

import type { VariantProps } from 'class-variance-authority';

const footerVariants = cva(
  'footer bg-footer-100 text-xs flex items-center  w-full px-4 py-4 md:px-0 border-b border-t border-dashed border-text-200 border-b-transparent',
  {
    variants: {
      variant: {
        mdx: 'max-h-[6rem]',
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
  const tFooter = await getScopedI18n('footer');

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
        <Timestamp variant='footer' />
        <p className='not-prose'>
          © 2021-
          {new Date().getFullYear()} <strong>Sledilnik.org</strong>
        </p>
      </div>
    </footer>
  );
}
