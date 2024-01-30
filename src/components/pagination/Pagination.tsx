'use client';

import { HTMLAttributes, PropsWithChildren } from 'react';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from '../icons';

const paginationLinkVariants = cva(
  'rounded-full inline-flex items-center justify-center leading-none min-w-[4ch] p-[0.375rem] aspect-square text-sm transition-all text-white ',
  {
    variants: {
      variant: {
        default: 'bg-brand-500 hover:scale-110',
        active: 'bg-brand-800 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface PaginationLinkProps
  extends VariantProps<typeof paginationLinkVariants>,
    PropsWithChildren<LinkProps> {
  className?: string;
}

const PaginationLink = function PaginationLink({
  href,
  variant,
  className,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      href={href}
      className={cn(paginationLinkVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Link>
  );
};

export interface PaginationProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  length: number;
  pageSize: number;
  page: number;
  doctorType: string;
}

const Pagination = function Pagination({
  length,
  page: currentPage,
  pageSize,
  doctorType,
  className,
}: PaginationProps) {
  const pathname = usePathname();

  const maxPage = Math.floor(length / +pageSize) + 1;

  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);

  let startOfSlice = currentPage - 3 < 0 ? 0 : currentPage - 3;
  let endOfSlice = startOfSlice + 5 > maxPage ? maxPage : startOfSlice + 5;

  // Adjust startOfSlice and endOfSlice if we're near the start or end of the pages array
  if (startOfSlice === 0) {
    endOfSlice = 5 > maxPage ? maxPage : 5;
  } else if (endOfSlice === maxPage) {
    startOfSlice = maxPage - 5 < 0 ? 0 : maxPage - 5;
  }

  const show = [...new Set([...pages.slice(startOfSlice, endOfSlice)])];

  const previousPage = currentPage === 1 ? 1 : currentPage - 1;
  const nextPage = currentPage === maxPage ? maxPage : currentPage + 1;
  const firstPage = 1;

  const styles = cn('flex flex-wrap items-center gap-1', className);

  return (
    <div className={styles}>
      <Link
        href={`${pathname}?type=${doctorType}&page=${firstPage}&pageSize=${pageSize}`}
        aria-label='First page'
        title='Go to the first page'
      >
        <ChevronFirstIcon />
      </Link>
      <Link
        href={`${pathname}?type=${doctorType}&page=${previousPage}&pageSize=${pageSize}`}
        aria-label='Previous page'
        title='Go to the previous page'
      >
        <ChevronLeftIcon />
      </Link>
      {currentPage > 3 ? (
        <span>
          <MoreHorizontalIcon />
        </span>
      ) : null}
      {show.map(page => {
        const searchParams = new URLSearchParams({
          type: doctorType,
          page: page.toString(),
          pageSize: pageSize.toString(),
        });

        return (
          <PaginationLink
            key={page}
            href={`${pathname}?${searchParams.toString()}`}
            variant={page === currentPage ? 'active' : 'default'}
            aria-label={`Page ${page}`}
          >
            {page}
          </PaginationLink>
        );
      })}
      {currentPage < maxPage - 2 ? (
        <span>
          <MoreHorizontalIcon />
        </span>
      ) : null}
      <Link
        href={`${pathname}?type=${doctorType}&page=${nextPage}&pageSize=${pageSize}`}
        aria-label='Next page'
        title='Go to the next page'
      >
        <ChevronRightIcon />
      </Link>
      <Link
        href={`${pathname}?type=${doctorType}&page=${maxPage}&pageSize=${pageSize}`}
        aria-label='Last page'
        title='Go to the last page'
      >
        <ChevronLastIcon />
      </Link>
    </div>
  );
};

export default Pagination;
