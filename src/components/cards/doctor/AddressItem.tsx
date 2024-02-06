'use client';

import { Fragment, HTMLAttributes, ReactNode } from 'react';

import { useSearchParams } from 'next/navigation';

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { normalize, partialMatch } from '@/lib/utils/search';

const addressItemVariants = cva('', {
  variants: {
    variant: {
      default: '',
      name: 'font-bold uppercase',
      address: 'text-text-400',
    },
    clamped: {
      true: 'line-clamp-1',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    clamped: false,
  },
});

export interface AddressItemProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof addressItemVariants> {
  text?: string;
}

const AddressItem = function AddressItem({
  children,
  variant = 'default',
  clamped = false,
  title,
  text,
  className,
  ...props
}: AddressItemProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const isMatch =
    typeof text === 'string' && query ? partialMatch([text], query) : false;

  const highlightedText: ReactNode[] = [];

  if (isMatch && typeof text === 'string' && query) {
    const splittedText = text.split(' ');
    const normalizedQuery = normalize(query);

    splittedText.forEach((word, i, arr) => {
      const index = normalize(word).indexOf(normalizedQuery);
      const key = word + i + arr.length + query;

      if (index === -1) {
        highlightedText.push(
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

      highlightedText.push(
        <Fragment key={key}>
          {before}
          {match && <mark>{match}</mark>}
          {after}
          {i < arr.length ? ' ' : ''}
        </Fragment>
      );
    });
  }

  return (
    <span
      className={cn(
        addressItemVariants({ variant, clamped, className }),
        title && 'cursor-help'
      )}
      title={title}
      {...props}
    >
      {children ?? isMatch ? highlightedText : text ?? title}
    </span>
  );
};

export default AddressItem;
