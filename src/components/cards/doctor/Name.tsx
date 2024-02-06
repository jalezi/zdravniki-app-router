'use client';

import { Fragment, ReactNode } from 'react';

import Link, { LinkProps } from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Heading } from '@/components/ui/headings';
import type { HeadingProps } from '@/components/ui/headings';
import { cn } from '@/lib/utils';
import { fullMatch, normalize } from '@/lib/utils/search';

export interface NameProps extends Omit<HeadingProps, 'children'> {
  href: LinkProps['href'];
  name: string;
  nameSrOnly?: string;
}

export default function Name({
  as,
  className,
  href,
  name,
  nameSrOnly,
  ...props
}: NameProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const isMatch = query && fullMatch(name, query);

  const highlightedName: ReactNode[] = [];

  if (isMatch) {
    const splittedName = name.split(' ');
    const normalizedQuery = normalize(query);

    splittedName.forEach((word, i, arr) => {
      const index = normalize(word).indexOf(normalizedQuery);
      const key = word + i + arr.length + query;

      if (index === -1) {
        highlightedName.push(
          <Fragment key={key}>
            {word}
            {i < arr.length ? ' ' : ''}
          </Fragment>
        );
        return;
      }

      const before = word.slice(0, index);
      const match = word.slice(index, index + query.length);
      const after = word.slice(index + query.length);

      highlightedName.push(
        <Fragment key={key}>
          {before}
          {match && <mark>{match}</mark>}
          {after}
          {i < arr.length ? ' ' : ''}
        </Fragment>
      );
    });
  }

  const styles = cn(
    'text-xl font-bold focus-within:text-brand-500 hover:text-brand-500 transition-all duration-367',
    className
  );

  return (
    <Link href={href} className={styles}>
      <Heading as={as} {...props}>
        {isMatch ? highlightedName : name}
        <span className='sr-only'>{nameSrOnly}</span>
      </Heading>
    </Link>
  );
}
