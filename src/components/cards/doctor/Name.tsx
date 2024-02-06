'use client';

import { Fragment } from 'react';

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

  const highlightedParts: [boolean, number, number][] = [];

  if (isMatch) {
    const normalizedName = normalize(name);
    const normalizedQuery = normalize(query)
      .split(' ')
      .sort((a, b) => b.length - a.length);

    normalizedQuery.forEach(q => {
      const index = normalizedName.indexOf(q);
      if (
        index === -1 ||
        highlightedParts.some(p => p[1] === index) ||
        index === index + q.length
      ) {
        return;
      }
      highlightedParts.push([true, index, index + q.length]);
    });
  }

  const sortedParts = [...highlightedParts.sort((a, b) => a[1] - b[1])];
  const filledParts = fillGaps(sortedParts, name.length);

  const styles = cn(
    'text-xl font-bold focus-within:text-brand-500 hover:text-brand-500 transition-all duration-367',
    className
  );

  return (
    <Link href={href} className={styles}>
      <Heading
        as={as}
        {...props}
        title={name}
        className='child:transition-all child:duration-367 child:hover:bg-inherit child:hover:text-brand-500'
      >
        {isMatch
          ? filledParts.map((item, i) => {
              const [isHighlighted, start, end] = item;
              return (
                <Fragment key={i}>
                  {isHighlighted ? (
                    <mark className=''>{name.substring(start, end)}</mark>
                  ) : (
                    name.substring(start, end)
                  )}
                </Fragment>
              );
            })
          : name}

        <span className='sr-only'>{nameSrOnly}</span>
      </Heading>
    </Link>
  );
}

// fill in the gaps
// before [true, 0, 0], [true, 8, 10], [true, 15, 20]
// after [false 0, 8], [true, 8, 10], [false, 10, 15], [true,15, 20]

// before [true, 13, 17]
// after [false, 0, 13], [true, 13, 17]

// also pass the length of the string to the function and use it to fill the gaps

function fillGaps(parts: [boolean, number, number][], length: number) {
  const result: [boolean, number, number][] = [];
  let start = 0;
  for (const part of parts) {
    const [isHighlighted, partStart, partEnd] = part;
    if (start < partStart) {
      result.push([false, start, partStart]);
    }
    result.push([isHighlighted, partStart, partEnd]);
    start = partEnd;
  }
  if (start < length) {
    result.push([false, start, length]);
  }
  return result;
}
